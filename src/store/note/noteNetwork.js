import apps from '../../shared/js/apps';
import asyncForEach from '../../shared/js/asyncForEach';
import {
  decryptMessage,
  decryptMessageSymmetric,
  encryptMessage,
  encryptMessageSymmetric,
} from '../../shared/js/encryption';
import generatePassword from '../../shared/js/generatePassword';
import { LocalStorage, sharedLocalStorageKeys } from '../../shared/js/LocalStorage';
import HTTP from '../../shared/react/HTTP';

export async function fetchNotes({ startKey, groupId, startTime, endTime }) {
  try {
    const startKeyQuery = startKey ? `startKey=${startKey}` : '';
    const groupIdQuery = groupId ? `groupId=${groupId}` : '';
    const startTimeQuery = startTime ? `startTime=${startTime}` : '';
    const endTimeQuery = endTime ? `endTime=${endTime}` : '';
    const queryString = [startKeyQuery, groupIdQuery, startTimeQuery, endTimeQuery]
      .filter(q => q)
      .join('&');

    const {
      items,
      startKey: newStartKey,
      limit,
    } = await HTTP.get(apps.note37.name, `/v1/notes${queryString ? `?${queryString}` : ''}`);

    const decryptedItems = [];
    await asyncForEach(items, async item => {
      const decrypted = await decryptNoteContent(item);
      decryptedItems.push(decrypted);
    });

    return {
      data: {
        items: decryptedItems,
        startKey: newStartKey,
        hasMore: decryptedItems.length >= limit,
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchNote(noteId) {
  try {
    const item = await HTTP.get(apps.note37.name, `/v1/notes/${noteId}`);

    const decrypted = await decryptNoteContent(item);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createNote({ note, date, groupIds }) {
  try {
    const password = generatePassword(20, true);
    const { note: encryptedNote } = await encryptNoteContent({ note }, password);

    const encryptedPassword = await encryptMessage(
      LocalStorage.get(sharedLocalStorageKeys.publicKey),
      password
    );
    const data = await HTTP.post(apps.note37.name, `/v1/notes`, {
      password: encryptedPassword,
      note: encryptedNote,
      date,
      groupIds,
    });

    const decrypted = await decryptNoteContent(data);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateNote(noteId, { note }, decryptedPassword) {
  try {
    const { note: encryptedNote } = await encryptNoteContent({ note }, decryptedPassword);

    const data = await HTTP.put(apps.note37.name, `/v1/notes/${noteId}`, {
      note: encryptedNote,
    });

    const decrypted = await decryptNoteContent(data);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteNote(noteId) {
  try {
    const data = await HTTP.delete(apps.note37.name, `/v1/notes/${noteId}`);

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

async function encryptNoteContent(data, decryptedPassword) {
  const { note } = data;

  const encryptedNote = note ? await encryptMessageSymmetric(decryptedPassword, note) : note;

  return {
    ...data,
    note: encryptedNote,
  };
}

async function decryptNoteContent(data) {
  const decryptedPassword = await decryptMessage(
    LocalStorage.get(sharedLocalStorageKeys.privateKey),
    data.password
  );

  const decryptedNote = data.note
    ? await decryptMessageSymmetric(decryptedPassword, data.note)
    : null;

  return {
    ...data,
    note: decryptedNote,
    decryptedPassword,
  };
}

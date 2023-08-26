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

export async function fetchTopics() {
  try {
    const topics = await HTTP.get(apps.note37.name, `/v1/topics`);

    const decryptedTopics = [];
    await asyncForEach(topics, async item => {
      const decrypted = await decryptTopicContent(item);
      decryptedTopics.push(decrypted);
    });

    return { data: { items: decryptedTopics }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchTopic(topicId) {
  try {
    const topic = await HTTP.get(apps.note37.name, `/v1/topics/${topicId}`);

    const decrypted = await decryptTopicContent(topic);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createTopic({ title, note }) {
  try {
    const password = generatePassword(20, true);
    const { title: encryptedTitle, note: encryptedNote } = await encryptTopicContent(
      { title, note },
      password
    );
    const encryptedPassword = await encryptMessage(
      LocalStorage.get(sharedLocalStorageKeys.publicKey),
      password
    );

    const data = await HTTP.post(apps.note37.name, `/v1/topics`, {
      password: encryptedPassword,
      title: encryptedTitle,
      note: encryptedNote,
    });

    const decrypted = await decryptTopicContent(data);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateTopic(topicId, { title, note, position }, decryptedPassword) {
  try {
    const { title: encryptedTitle, note: encryptedNote } = await encryptTopicContent(
      { title, note },
      decryptedPassword
    );

    const data = await HTTP.put(apps.note37.name, `/v1/topics/${topicId}`, {
      title: encryptedTitle,
      note: encryptedNote,

      position,
    });

    const decrypted = await decryptTopicContent(data);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteTopic(topicId) {
  try {
    const data = await HTTP.delete(apps.note37.name, `/v1/topics/${topicId}`);

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

async function encryptTopicContent(data, decryptedPassword) {
  const { title, note } = data;

  const encryptedTitle = title ? await encryptMessageSymmetric(decryptedPassword, title) : title;
  const encryptedNote = note ? await encryptMessageSymmetric(decryptedPassword, note) : note;

  return {
    ...data,
    title: encryptedTitle,
    note: encryptedNote,
  };
}

async function decryptTopicContent(data) {
  const { title, note, isPublic, password } = data;

  const privateKey = LocalStorage.get(sharedLocalStorageKeys.privateKey);
  const decryptedPassword = isPublic ? password : await decryptMessage(privateKey, password);
  const decryptedTitle = await decryptMessageSymmetric(decryptedPassword, title);
  const decryptedNote = note ? await decryptMessageSymmetric(decryptedPassword, note) : null;

  return {
    ...data,
    title: decryptedTitle,
    note: decryptedNote,
    decryptedPassword,
    items: [],
  };
}

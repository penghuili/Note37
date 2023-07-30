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
    const topics = await HTTP.get(apps.often37.name, `/v1/topics`);

    const decryptedTopics = [];
    await asyncForEach(topics, async item => {
      const decrypted = await decryptTopicContent(item);
      decryptedTopics.push(decrypted);
    });

    return { data: decryptedTopics, error: null };
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

    const data = await HTTP.post(apps.often37.name, `/v1/topics`, {
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

export async function updateTopic(topicId, decryptedPassword, { title, note }) {
  try {
    const { title: encryptedTitle, note: encryptedNote } = await encryptTopicContent(
      { title, note },
      decryptedPassword
    );

    const data = await HTTP.put(apps.often37.name, `/v1/topics/${topicId}`, {
      title: encryptedTitle,
      note: encryptedNote,
    });

    const decrypted = await decryptTopicContent(data);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchItems(topicId, { startKey, month }, decryptedPassword) {
  try {
    const queryStartKey = startKey ? `startKey=${startKey}` : '';
    const queryMonth = month ? `month=${month}` : '';
    const {
      items,
      startKey: newStartKey,
      limit,
    } = await HTTP.get(
      apps.often37.name,
      `/v1/topics/${topicId}/items${
        queryStartKey || queryMonth ? `?${queryStartKey}${queryMonth}` : ''
      }`
    );

    const decryptedItems = [];
    await asyncForEach(items, async item => {
      const decrypted = await decryptItemContent(item, decryptedPassword);
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

export async function createItem(topicId, decryptedPassword, { note, date }) {
  try {
    const { note: encryptedNote } = await encryptItemContent({ note }, decryptedPassword);

    const data = await HTTP.post(apps.often37.name, `/v1/topics/${topicId}/items`, {
      note: encryptedNote,
      date,
    });

    const decrypted = await decryptItemContent(data, decryptedPassword);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateItem(topicId, itemId, decryptedPassword, { note }) {
  try {
    const { note: encryptedNote } = await encryptItemContent({ note }, decryptedPassword);

    const data = await HTTP.put(apps.often37.name, `/v1/topics/${topicId}/items/${itemId}`, {
      note: encryptedNote,
    });

    const decrypted = await decryptItemContent(data, decryptedPassword);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteItem(topicId, itemId) {
  try {
    const data = await HTTP.delete(apps.often37.name, `/v1/topics/${topicId}/items/${itemId}`);

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
  };
}

async function encryptItemContent(data, decryptedPassword) {
  const { note } = data;

  const encryptedNote = note ? await encryptMessageSymmetric(decryptedPassword, note) : note;

  return {
    ...data,
    note: encryptedNote,
  };
}

async function decryptItemContent(data, decryptedPassword) {
  const { note } = data;

  const decryptedNote = note ? await decryptMessageSymmetric(decryptedPassword, note) : null;

  return {
    ...data,
    note: decryptedNote,
  };
}

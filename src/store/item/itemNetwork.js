import apps from '../../shared/js/apps';
import asyncForEach from '../../shared/js/asyncForEach';
import { decryptMessageSymmetric, encryptMessageSymmetric } from '../../shared/js/encryption';
import { onlyKeepNumbers } from '../../shared/js/regex';
import HTTP from '../../shared/react/HTTP';

export async function fetchItems(topicId, { startKey, month }, decryptedPassword) {
  try {
    const queryStartKey = startKey ? `startKey=${startKey}` : '';
    const queryMonth = month ? `month=${onlyKeepNumbers(month)}` : '';
    const {
      items,
      startKey: newStartKey,
      limit,
    } = await HTTP.get(
      apps.note37.name,
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

export async function fetchItem(topicId, itemId, decryptedPassword) {
  try {
    const item = await HTTP.get(apps.note37.name, `/v1/topics/${topicId}/items/${itemId}`);

    const decrypted = await decryptItemContent(item, decryptedPassword);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createItem(topicId, { note, date }, decryptedPassword) {
  try {
    const { note: encryptedNote } = await encryptItemContent({ note }, decryptedPassword);

    const data = await HTTP.post(apps.note37.name, `/v1/topics/${topicId}/items`, {
      note: encryptedNote,
      date,
    });

    const decrypted = await decryptItemContent(data, decryptedPassword);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateItem(topicId, itemId, { note }, decryptedPassword) {
  try {
    const { note: encryptedNote } = await encryptItemContent({ note }, decryptedPassword);

    const data = await HTTP.put(apps.note37.name, `/v1/topics/${topicId}/items/${itemId}`, {
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
    const data = await HTTP.delete(apps.note37.name, `/v1/topics/${topicId}/items/${itemId}`);

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
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

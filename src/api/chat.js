import { BASE_URL } from './url';
import { GetTokenFromStorage } from '../utils';

const ChatUrl = '/chats';

export const GetChats = async () => {
  try {
    const token = await GetTokenFromStorage();
    const response = await fetch(BASE_URL + ChatUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const GetChatMessages = async (id) => {
  try {
    const token = await GetTokenFromStorage();
    const response = await fetch(`${BASE_URL}/messages?chat_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const SendMessage = async (id, text) => {
  try {
    const token = await GetTokenFromStorage();
    const response = await fetch(
      `${BASE_URL}/messages?chat_id=${id}&text=${text}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const CreateChat = async (id) => {
  try {
    const token = await GetTokenFromStorage();
    const response = await fetch(`${BASE_URL}/chats?user_id=${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

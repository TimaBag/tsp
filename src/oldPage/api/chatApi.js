import { REST_API_URL, STD_HEADERS } from '../constants/constants';
const myChatsUrl = REST_API_URL + "my_chats/";
const chatUrl = REST_API_URL + "chat/";
const countChatUrl = REST_API_URL + "number_of_unread/";

export const getMyChats = (token) => (
  fetch(
    myChatsUrl,
    {
      method: 'GET',
      headers: {...STD_HEADERS, "Authorization": "JWT " + token}
    }
  )
);

export const getCountChats = (token) => (
  fetch(
    countChatUrl,
    {
      method: 'GET',
      headers: {...STD_HEADERS, "Authorization": "JWT " + token}
    }
  )
);

export const getChatItem = (token, params) => (
  fetch(
    chatUrl + '?with_user=' + params.user_id,
    {
      method: 'GET',
      headers: {...STD_HEADERS, "Authorization": "JWT " + token}
    }
  )
);

export const sendMessage = (token, data) => (
  fetch(
    chatUrl,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        "Content-Type": "application/json",
        "Authorization": "JWT " + token,
      },
      body: JSON.stringify(data)
    }
  )
);

export const readMessage = (token, data,is_read) => (
  fetch(
    chatUrl+data+"/",
    {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        "Content-Type": "application/json",
        "Authorization": "JWT " + token,
      },
      body: JSON.stringify(is_read)
    }
  )
);

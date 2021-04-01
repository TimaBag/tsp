import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';

const myChatsList = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_MY_CHATS_SUCCEEDED:
      return action.myChatsList;
    case actionTypes.ACTION_GET_MY_CHATS_STARTED:
    case actionTypes.ACTION_GET_MY_CHATS_FAILED:
      return [];
    default:
      return state;
  }
};

const countChat = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_COUNT_CHATS_SUCCEEDED:
      return action.countChat;
    case actionTypes.ACTION_GET_COUNT_CHATS_STARTED:
    case actionTypes.ACTION_GET_COUNT_CHATS_FAILED:
      return [];
    default:
      return state;
  }
};

const chatItem = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_CHAT_SUCCEEDED:
      return action.chatItem;
    case actionTypes.ACTION_SEND_MESSAGE_SUCCEEDED:
      return [...state, action.sentMessage]
    case actionTypes.ACTION_GET_CHAT_STARTED:
    case actionTypes.ACTION_GET_CHAT_FAILED:
      return [];
    default:
      return state;
  }
};

const isMessageSent = (state = false, action) => {
  switch(action.type) {
    case actionTypes.ACTION_SEND_MESSAGE_SUCCEEDED:
      return true;
    case actionTypes.ACTION_SEND_MESSAGE_STARTED:
    case actionTypes.ACTION_SEND_MESSAGE_FAILED:
      return false;
    default:
      return state;
  }
};

const chatReducer = combineReducers({
  myChatsList,
  chatItem,
  isMessageSent,
  countChat
});

export default chatReducer;

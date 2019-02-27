import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const addMessage = createAction('MESSAGE_FETCH_SUCCESS');
export const addChannel = createAction('CHANNEL_ADD');

export const addChannelRequest = ({ channel }) => async () => {
  const url = routes.channelsUrl();
  await axios.post(url, { data: { attributes: { ...channel } } });
};

export const addMessageRequest = ({ message, channelId }) => async () => {
  const url = routes.messagesUrl(channelId);
  await axios.post(url, { data: { attributes: { ...message } } });
};

export const changeChannel = createAction('CHANNEL_CHANGE');

export const removeChannel = createAction('CHANNEL_REMOVE');
export const removeMessages = createAction('MESSAGES_REMOVE');

export const removeChannelRequest = ({ channelId }) => async () => {
  const url = routes.channelActionUrl(channelId);
  await axios.delete(url);
};

export const renameChannel = createAction('CHANNEL_RENAME');
export const renameChannelRequest = ({ channelId, name }) => async () => {
  const url = routes.channelActionUrl(channelId);
  await axios.patch(url, { data: { attributes: { name } } });
};

export const setModal = createAction('MODAL_SET');
export const toggleModalUIState = createAction('MODAL_UI_STATE_TOGGLE');
export const setChannelForRemoval = createAction('CHANNEL_FOR_REMOVAL_SET');

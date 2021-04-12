import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { GetChatMessages, GetUserInfo, SendMessage } from 'src/api';
import { parseJSON } from 'date-fns';
import { ActionCable, Cable } from '@kesha-antonov/react-native-action-cable';
import { BASE_URL } from 'src/api/url';
import { GetTokenFromStorage } from 'src/utils';

const ChatPage = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState();

  const getMessages = async (id) => {
    const res = await GetChatMessages(id);
    const resMessages = res.map((mes) => ({
      _id: mes.id,
      text: mes.text,
      createdAt: parseJSON(mes.sent_at),
      user: {
        _id: mes.sender.id,
        name: mes.sender.name,
      },
    }));
    setMessages(resMessages);
  };

  const getUserId = async () => {
    const res = await GetUserInfo();
    setUserId(res.id);
  };

  const getToken = async () => {
    const token = await GetTokenFromStorage();
    setToken(token);
  };

  useEffect(() => {
    getUserId();
    getToken();
    getMessages(route.params.id);
  }, [route]);

  useEffect(() => {
    if (token) {
      const actionCable = ActionCable.createConsumer(
        `${BASE_URL}/cable?token=${token}`,
      );
      const cable = new Cable({});

      const channel = cable.setChannel(
        'MessageChannel', // channel name to which we will pass data from Rails app with `stream_from`
        actionCable.subscriptions.create({
          channel: 'MessageChannel', // from Rails app app/channels/chat_channel.rb
        }),
      );

      channel.on('received', (payload) => {
        console.log('socket received:');
        const action = payload.message.action;
        switch (action) {
          case 'new_message':
            const messageParsed = JSON.parse(
              JSON.parse(payload.message.message),
            );

            setMessages([
              {
                _id: messageParsed.id,
                text: messageParsed.text,
                createdAt: parseJSON(messageParsed.sent_at),
                user: {
                  _id: messageParsed.sender.id,
                  name: messageParsed.sender.name,
                },
              },
              ...messages,
            ]);
            break;
          default:
            console.log(`OrderChanel message: unhandled action ${action}`);
        }
      });
    }
  }, [token, messages]);

  const onSend = useCallback(
    async (newMessages = []) => {
      await SendMessage(route.params.id, newMessages[0].text);
      // console.log(newMessages[0].text);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages),
      );
    },
    [route],
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: userId,
      }}
    />
  );
};

export default ChatPage;

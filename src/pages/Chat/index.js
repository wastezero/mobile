import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatPage = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(
      [
        {
          _id: 1,
          text: 'Hello!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Free flow',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'What would you like to order?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Free flow',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ].reverse(),
    );
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages),
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default ChatPage;

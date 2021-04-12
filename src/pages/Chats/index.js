import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FoodCard } from 'src/components';
import { GetChats } from 'src/api';

const ChatPage = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const getChats = async () => {
    const chatsRest = await GetChats();
    setChats(chatsRest);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getChats();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            onPress={() =>
              navigation.navigate('Chat', {
                title: chat.user.restaurant || chat.user.name,
                id: chat.id,
              })
            }>
            <FoodCard
              name={
                chat.user.restaurant
                  ? `${chat.user.restaurant} / ${chat.user.name}`
                  : chat.user.name
              }
              restaurant={chat.last_message && chat.last_message.text}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
});

export default ChatPage;

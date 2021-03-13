import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FoodCard } from 'src/components';

const ChatPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat', { title: 'Free flow' })}>
        <FoodCard name="Free flow" restaurant="Ok, I will pick up at 6pm" />
      </TouchableOpacity>
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

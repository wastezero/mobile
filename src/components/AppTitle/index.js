import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AppTitle = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.topText}>WasteZero</Text>
      <Text style={styles.bottomText}>Food</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 50,
  },
  topText: {
    fontSize: 50,
    fontStyle: 'italic',
    color: '#ed887e',
  },
  bottomText: {
    fontSize: 40,
    fontStyle: 'italic',
    color: '#32495b',
  },
});

export default AppTitle;

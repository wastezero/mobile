import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const InfoField = ({field, value}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.field}>{field}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  field: {
    color: '#777b7e',
    fontSize: 18,
  },
  value: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InfoField;

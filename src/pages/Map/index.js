import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AppTitle from '../../components/AppTitle';

const MapPage = ({navigation}) => {
  const onButtonClick = useCallback(
    (pageName) => () => {
      navigation.navigate(pageName);
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <AppTitle />
      <TouchableOpacity style={styles.button} onPress={onButtonClick('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onButtonClick('SignUp')}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  button: {
    borderWidth: 1,
    borderColor: '#32495b',
    borderRadius: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    width: 150,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
});

export default MapPage;

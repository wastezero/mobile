import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Button} from 'galio-framework';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetUserInfo} from '../../api';

const ProfilePage = ({navigation}) => {
  const [name, setName] = useState();

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Initial');
  };

  useEffect(() => {
    const getInfo = async () => {
      const info = await GetUserInfo();
      setName(`${info.name} ${info.surname}`);
    };
    getInfo();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.name}>{name}</Text>
      </SafeAreaView>
      <Button
        color="transparent"
        shadowless
        style={styles.button}
        onPress={() => navigation.navigate('MyOrders')}>
        <Text>My orders</Text>
      </Button>
      <Button color="transparent" shadowless style={styles.button}>
        <Text>Edit profile</Text>
      </Button>
      <Button
        color="transparent"
        shadowless
        style={styles.button}
        onPress={logOut}>
        <Text>Log Out</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    paddingHorizontal: 20,
  },
  name: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  email: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    margin: 0,
    marginTop: 10,
    borderWidth: 1,
  },
});

export default ProfilePage;

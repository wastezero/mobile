import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { GetUserInfo } from '../../api';

const LoadingPage = ({ navigation }) => {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await GetUserInfo();
        if (res.id) {
          navigation.navigate('Main');
        } else {
          navigation.navigate('Initial');
        }
      } catch (e) {
        navigation.navigate('Initial');
      }
    };
    checkToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

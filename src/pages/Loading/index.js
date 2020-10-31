import React, {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {GetTokenFromStorage} from '../../utils';

const LoadingPage = ({navigation}) => {
  useEffect(() => {
    const checkToken = async () => {
      const token = await GetTokenFromStorage();
      if (token) {
        navigation.navigate('Main');
      } else {
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

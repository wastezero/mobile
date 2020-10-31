import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetTokenFromStorage = async () => {
  return await AsyncStorage.getItem('token');
};

import AsyncStorage from '@react-native-async-storage/async-storage';

import {SERVER_URL} from './url';

export const SignIn = async (email, password) => {
  try {
    const bodyMessage = {
      client: {
        email,
        password,
      },
    };
    const response = await fetch(SERVER_URL + '/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyMessage),
    });
    const result = await response.json();
    await AsyncStorage.setItem('token', result.authentication_token);
  } catch (e) {}
};

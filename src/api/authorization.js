import AsyncStorage from '@react-native-async-storage/async-storage';

import {SERVER_URL} from './url';

export const SignIn = async (email, password) => {
  try {
    const bodyMessage = {
      user: {
        email,
        password,
      },
    };
    const response = await fetch(SERVER_URL + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyMessage),
    });
    if (response.status === 401) {
      throw new Error('Incorrect password');
    }
    if (response.status === 422) {
      throw new Error('User does not exist');
    }
    const result = await response.json();
    await AsyncStorage.setItem('token', result.authentication_token);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const SignUp = async (
  email,
  password,
  name,
  surname,
  phone,
  repeatedPassword,
) => {
  try {
    const bodyMessage = {
      user: {
        email,
        password,
        name,
        surname,
        phone,
        password_confirmation: repeatedPassword,
      },
    };
    const response = await fetch(SERVER_URL + '/sign_up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyMessage),
    });
    const result = await response.json();
    await AsyncStorage.setItem('token', result.authentication_token);
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

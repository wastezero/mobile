import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import InitialScreen from './Initial';
import LoginPage from './Login';
import SignUpPage from './SignUp';
import MainPage from './Main';

const Stack = createStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Initial"
          component={InitialScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{title: 'Login', headerBackTitle: 'Main'}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpPage}
          options={{title: 'Register', headerBackTitle: 'Main'}}
        />
        <Stack.Screen name="Main" component={MainPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

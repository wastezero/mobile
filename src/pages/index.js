import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import InitialScreen from './Initial';
import LoginPage from './Login';
import SignUpPage from './SignUp';
import MainPage from './Main';
import OrderPage from './Order';
import LoadingPage from './Loading';
import MyOrdersPage from './MyOrders';

const Stack = createStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          name="Loading"
          component={LoadingPage}
          options={{headerShown: false}}
        />
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
        <Stack.Screen
          name="Main"
          component={MainPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Order"
          component={OrderPage}
          options={({route}) => ({
            title: route ? route.params.title || '' : '',
          })}
        />
        <Stack.Screen
          name="MyOrders"
          component={MyOrdersPage}
          options={{title: 'My Orders', headerBackTitle: 'Main'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

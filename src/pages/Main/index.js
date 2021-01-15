import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Icon } from 'galio-framework';

import MenuPage from '../Menu';
import MapPage from '../Map';
import ProfilePage from '../Profile';

const Tab = createBottomTabNavigator();

const MainPage = () => {
  return (
    <Tab.Navigator initialRouteName="Menu">
      <Tab.Screen
        name="Menu"
        component={MenuPage}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="menu" family="Ionicons" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapPage}
        options={{
          tabBarButton: ({ onPress }) => (
            <Button
              onPress={onPress}
              onlyIcon
              icon="map"
              iconFamily="Ionicons"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="user" family="evilicons" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainPage;

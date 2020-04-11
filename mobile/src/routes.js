import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import logo from '~/assets/logo-internal.png';

import SignIn from '~/pages/SignIn';
import CheckIns from '~/pages/CheckIn';

import List from '~/pages/HelpOrders/List';
import New from '~/pages/HelpOrders/New';
import Show from '~/pages/HelpOrders/Show';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            CheckIn: {
              screen: createStackNavigator(
                {
                  CheckIns,
                },
                {
                  defaultNavigationOptions: {
                    headerTintColor: '#666',
                    headerTitleAlign: 'center',
                    headerTitle: () => <Image source={logo} />,
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                },
              ),
            },
            HelpOrders: {
              screen: createStackNavigator(
                {
                  List,
                  New,
                  Show,
                },
                {
                  defaultNavigationOptions: {
                    headerTintColor: '#666',
                    headerTitleAlign: 'center',
                    headerTitle: () => <Image source={logo} />,
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                },
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir Ajuda',
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#999999',
            },
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );

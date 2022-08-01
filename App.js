/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer, StackActions} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import Home from './src/components/home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ImageFull from './src/components/imageFull';
import ImageView from './src/components/imageView';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'gray',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Image"
          component={ImageFull}
          options={({route}) => ({title: route.params.item.name})}
        />
        <Stack.Screen
          name="ImageFull"
          component={ImageView}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import {
  NavigationContainer,
  StackActions,
  TabActions,
} from '@react-navigation/native';
import React from 'react';
import Home from './src/components/home';
import Categories from './src/components/categories';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ImageFull from './src/components/imageFull';
import ImageView from './src/components/imageView';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import Favorites from './src/components/favorites';
import {combineReducers, createStore} from 'redux';
import wallsReducer from './src/store/reducers/walls';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import Splash from './src/components/splash';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const rootReducer = {
  walls: wallsReducer,
};

const store = configureStore({reducer: rootReducer});

function Walls(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'gray',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        initialParams={props?.route?.params}
      />
      <Stack.Screen
        name="ImageFull"
        component={ImageFull}
        options={({route}) => ({title: route.params?.item?.name})}
      />
      <Stack.Screen
        name="ImageView"
        component={ImageView}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function Category() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'gray',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen
        name="Home"
        component={Home}
        options={({route}) => ({title: route.params?.category})}
      />
      <Stack.Screen
        name="ImageFull"
        component={ImageFull}
        options={({route}) => ({
          title: route.params?.item?.name,
        })}
      />
      <Stack.Screen
        name="ImageView"
        component={ImageView}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function TabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Walls"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: 'gray',
        tabBarStyle: {backgroundColor: 'black'},
      }}>
      <Tab.Screen
        name="Walls"
        component={Walls}
        options={{
          tabBarIcon: ({focused}) => (
            <Text
              style={{
                fontSize: scale(15),
                color: 'black',
                fontWeight: focused ? 'bold' : 'normal',
              }}>
              Walls
            </Text>
          ),
          tabBarItemStyle: {borderBottomLeftRadius: 10},
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Category}
        options={{
          tabBarIcon: ({focused}) => (
            <Text
              style={{
                fontSize: scale(15),
                color: 'black',
                fontWeight: focused ? 'bold' : 'normal',
              }}>
              Categories
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Walls}
        initialParams={{fromFavs: true}}
        options={{
          tabBarIcon: ({focused}) => (
            <Text
              style={{
                fontSize: scale(15),
                color: 'black',
                fontWeight: focused ? 'bold' : 'normal',
              }}>
              Favorites
            </Text>
          ),
          tabBarItemStyle: {borderBottomRightRadius: 10},
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const linking = {
    prefixes: ['wall_app://', 'https://wall_app.com'],
    config: {
      screens: {
        Home: 'home',
        ImageFull: {
          path: 'imagefull/:url',
          parse: {
            url: url => `${url}`,
          },
        },
      },
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="TabNav" component={TabNav} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

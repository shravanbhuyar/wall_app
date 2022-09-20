import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Home from './home';

const Favorites = props => {
  const favWalls = useSelector(state => state.walls.favWalls);
  console.log('favWalls', props);

  return <Home walls={favWalls} />;
};

export default Favorites;

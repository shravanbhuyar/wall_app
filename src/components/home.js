import React from 'react';
import {
  View,
  FlatList,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {walls} from '../constants/images';
import ImageCard from './imageCard';

const Home = props => {
  const renderItem = item => (
    <TouchableOpacity
      style={{flex: 1, backgroundColor: 'black'}}
      onPress={() => props.navigation.navigate('Image', {item})}>
      <ImageCard imgData={item} />
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={walls}
      renderItem={item => renderItem(walls[item.index])}
      keyExtractor={item => item.id}
      numColumns={2}
      style={{backgroundColor: 'black'}}
    />
  );
};

export default Home;

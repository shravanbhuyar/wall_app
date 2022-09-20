import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity, View, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {walls} from '../constants/images';
import ImageCard from './imageCard';
import * as wallActions from './../store/actions/walls';

const Home = props => {
  let data = [];
  const newWalls = useSelector(state => state.walls.walls);
  const dispatch = useDispatch();

  if (props.route?.params?.category) {
    for (let i = 0; i < newWalls.length; i++) {
      if (newWalls[i].category === props.route.params.category) {
        data.push(newWalls[i]);
      }
    }
  } else if (props.route?.params?.fromFavs) {
    data = useSelector(state => state.walls.favWalls);
  } else {
    data = newWalls;
  }

  // useEffect(() => {
  //   fetchWalls();
  // }, [newWalls]);

  // const fetchWalls = async () => {
  //   const res = await fetch(
  //     'https://wall-app-cd559-default-rtdb.firebaseio.com/wallpapers.json',
  //   );
  //   const resData = await res.json();
  //   console.log('resData', resData);
  //   dispatch(wallActions.setWalls(resData));
  //   newWalls = useSelector(state => state.walls.walls);
  // };

  const renderItem = item => (
    <TouchableOpacity
      style={{flex: 1, backgroundColor: 'black'}}
      onPress={() =>
        props.navigation.navigate('ImageFull', {item: item, url: item.url})
      }>
      <ImageCard imgData={item} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      extraData={data}
      renderItem={(item, index) => renderItem(data[item.index])}
      keyExtractor={item => item.id}
      numColumns={2}
      style={{backgroundColor: 'black'}}
      ListEmptyComponent={
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={{color: 'white', alignSelf: 'center'}}>
            No images in this category!
          </Text>
        </View>
      }
    />
  );
};

export default Home;

import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import * as wallActions from './../store/actions/walls';

const Splash = props => {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();

  const fetchWalls = async () => {
    const res = await fetch(
      'https://wall-app-cd559-default-rtdb.firebaseio.com/wallpapers.json',
    );
    const resData = await res.json();
    console.log('resData', resData);
    dispatch(wallActions.setWalls(resData));
    setIsVisible(false);
  };

  useEffect(() => {
    fetchWalls();
  }, []);

  return (
    <View>
      {isVisible ? (
        <View>
          <Text>Splash</Text>
        </View>
      ) : (
        props.navigation.navigate('TabNav')
      )}
    </View>
  );
};

export default Splash;

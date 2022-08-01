import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';

const ImageCard = props => {
  return (
    <View
      style={{
        margin: scale(5),
      }}>
      <Image
        source={{
          uri: props.imgData.url,
        }}
        style={{
          width: Dimensions.get('window').width / 2 - scale(10),
          height: Dimensions.get('window').height / 4 - scale(10),
          resizeMode: 'cover',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <Text
        style={{
          color: 'white',
          backgroundColor: 'gray',
          paddingLeft: 5,
          borderRadius: 2.5,
          paddingVertical: scale(10),
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          width: Dimensions.get('window').width / 2 - scale(10),
        }}>
        {props.imgData.name.toString()}
      </Text>
    </View>
  );
};

export default ImageCard;

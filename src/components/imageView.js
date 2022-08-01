import React from 'react';
import {View, Image} from 'react-native';

const ImageView = props => {
  console.log(props.route.params.item.url);
  return (
    <View>
      <Image
        source={{
          uri: props.route.params.item.url,
        }}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        }}
      />
    </View>
  );
};

export default ImageView;

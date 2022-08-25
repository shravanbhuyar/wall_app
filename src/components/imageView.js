import React from 'react';
import {View, Image} from 'react-native';

const ImageView = props => {
  return (
    <View>
      <Image
        source={{
          uri: props.route.params.url,
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

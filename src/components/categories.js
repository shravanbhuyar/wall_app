import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  TouchableNativeFeedback,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {categories} from '../constants/categories';

const Categories = props => {
  console.log(props);
  const renderItem = item => (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#ffffff', true)}
        onPress={() =>
          props.navigation.navigate('Home', {
            category: item.category,
            screen: 'Home',
          })
        }>
        <View>
          <ImageBackground
            source={item.img}
            style={{
              height: scale(120),
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            resizeMode="cover">
            <Text style={{fontSize: scale(40), color: 'white'}}>
              {item.category}
            </Text>
          </ImageBackground>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
  return (
    <FlatList
      data={categories}
      renderItem={item => renderItem(item.item)}
      keyExtractor={item => item.id}
      //style={{backgroundColor: 'red'}}
    />
  );
};

export default Categories;

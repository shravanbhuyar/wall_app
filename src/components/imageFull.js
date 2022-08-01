import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  TouchableNativeFeedback,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CameraRoll from '@react-native-community/cameraroll';

const ImageFull = props => {
  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  async function savePicture(tag) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.save(
      tag,
      ('photo',
      Environment.getExternalStoragePublicDirectory(
        Environment.DIRECTORY_DOWNLOADS,
      )),
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  return (
    <View>
      <ImageBackground
        source={{
          uri: props.route.params.item.url,
        }}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        }}
        blurRadius={5}>
        <Image
          source={{
            uri: props.route.params.item.url,
          }}
          style={{
            width: Dimensions.get('window').width,
            height: '100%',
            resizeMode: 'contain',
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: '100%',
            backgroundColor: '#383838',
            opacity: 0.5,
            flexDirection: 'row',
          }}>
          {/* <Text style={{fontSize: scale(20)}}>
            {props.route.params.item.name}
          </Text> */}

          <View style={styles.touchableView}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('black', true)}
              onPress={() => savePicture(props.route.params.item.url)}>
              <View>
                <Icon
                  name="download"
                  size={30}
                  color="white"
                  style={styles.icon}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.touchableView}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('black', true)}
              onPress={console.log('asdsd')}>
              <View>
                <Icon
                  name="share-variant-outline"
                  size={30}
                  color="white"
                  style={styles.icon}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.touchableView}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('black', true)}
              onPress={() =>
                props.navigation.navigate('ImageFull', {
                  item: props.route.params.item,
                })
              }>
              <View>
                <Icon
                  name="fullscreen"
                  size={30}
                  color="white"
                  style={styles.icon}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {margin: scale(10), opacity: 1},
});
export default ImageFull;

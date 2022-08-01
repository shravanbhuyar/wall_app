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
import RNFetchBlob from 'rn-fetch-blob';

const ImageFull = props => {
  const checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download Images',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage Permission Granted.');
        downloadImage();
      } else {
        alert('Storage Permission Not Granted');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadImage = async () => {
    let date = new Date();
    let ext = getExtention(props.route.params.item.url);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;

    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', props.route.params.item.url)
      .then(res => {
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      })
      .catch(err => console.log(err));
  };

  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

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
              onPress={checkPermission}>
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

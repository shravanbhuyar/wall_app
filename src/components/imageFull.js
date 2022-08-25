import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  TouchableNativeFeedback,
  StyleSheet,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'rn-fetch-blob';
import {loaderGif} from '../constants/images';

const ImageFull = props => {
  const [isLoading, setIsLoading] = useState(false);
  let url = decodeURIComponent(props.route.params.url);
  console.log(url);
  const checkPermission = async () => {
    try {
      //setIsLoading(true);
      console.log('loading', isLoading);
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
      console.log(err);
    }
  };

  const downloadImage = async () => {
    let date = new Date();
    let ext = getExtention(url);
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
      .fetch('GET', url)
      .then(res => {
        setIsLoading(false);
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  function onDownloadPress() {
    setIsLoading(true);
    checkPermission();
  }

  return (
    <View>
      <ImageBackground
        source={{
          uri: url,
        }}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        }}
        blurRadius={5}>
        <Image
          source={{
            uri: url,
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
              onPress={onDownloadPress}>
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
                props.navigation.navigate('ImageView', {
                  url: url,
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
      <Modal visible={isLoading} transparent={true} style={{flex: 1}}>
        <FastImage
          source={loaderGif}
          style={{flex: 1, alignSelf: 'center'}}
          resizeMode={FastImage.resizeMode.contain}
        />
      </Modal>
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

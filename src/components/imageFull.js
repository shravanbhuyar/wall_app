import React, {useEffect, useState} from 'react';
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
  Share,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {loaderGif} from '../constants/images';
import {toggleFav} from '../store/actions/walls';

const ImageFull = props => {
  //console.log(props.route.params.item.id);

  const [isLoading, setIsLoading] = useState(false);
  let url = decodeURIComponent(props.route.params.url);
  let encoded_url = encodeURIComponent(url);

  const dispatch = useDispatch();

  const favWalls = useSelector(state => state.walls.favWalls);
  let isFav;
  useEffect(() => {
    isFav = favWalls.findIndex(wall => wall.id === props.route.params.item.id);
    isFav >= 0 ? setIconName('heart') : setIconName('heart-outline');
  }, [favWalls]);

  const [iconName, setIconName] = useState();

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
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  async function onDownloadPress() {
    setIsLoading(true);
    await checkPermission();
  }

  const onShare = () => {
    Share.share({
      message: `Checkout this cool wallpaper :
      https://wall_app.com/imagefull/${encoded_url}`,
    });
  };

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
              onPress={onShare}>
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
          <View style={styles.touchableView}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('black', true)}
              onPress={() => dispatch(toggleFav(props.route.params.item.id))}>
              <View>
                <Icon
                  name={iconName}
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
          style={{
            flex: 1,
            alignSelf: 'center',
            height: scale(100),
            width: scale(100),
            marginTop: scale(50),
          }}
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

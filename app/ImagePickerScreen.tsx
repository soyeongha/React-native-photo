import HeaderRight from '@/components/HeaderRight';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import * as MediaLibray from 'expo-media-library';          

const initialListInfo = {endCursor: '', hasNextPage: true};

const ImagePickerScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [status, requestPermission] = MediaLibray.usePermissions();
  const width = useWindowDimensions().width / 3;
  const [photos, setPhotos] = useState([]);
  const [listInfo, setListInfo] = useState({
    endCursor: '',
    hasNextPage: true,
  });

  useEffect(() => {
    (async () => {
      const { granted } = await requestPermission();

      if (!granted) {
        Alert.alert('사진접근권한', '사진 접근 권한이 필요합니다', [
          {
            text: '확인',
            onPress: () => {
              navigation.canGoBack() && navigation.goBack();
            },
          },
        ]);
      }
    })();
  }, [navigation, requestPermission]);

  console.log(status);

  const getPhotos = useCallback(async () => {
    const options = {
      first: 30,
      SortBy: [MediaLibray.SortBy.creationTime],
    };
    if (listInfo.endCursor) {
      options['after'] = listInfo.endCursor;
    }

    if (listInfo.hasNextPage) {
      const { assets, endCursor, hasNextPage } =
        await MediaLibray.getAssetsAsync(options);
      setPhotos((prev) => [...prev, ...assets]);
      setListInfo({ endCursor, hasNextPage });
    }
  }, [listInfo.hasNextPage, listInfo.endCursor]);

  console.log(photos.length);

  useEffect(() => {
    if (status?.granted) {
      getPhotos();
    }
  }, [status?.granted]);

  useLayoutEffect(() => {
    navigation.setOptions({
      HeaderRight: () => <HeaderRight onPress={() => {}} />,
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={photos}
        renderItem={({ item }) => (
          <Pressable style={{ width, height: width }}>
            <Image source={{ uri: item.uri }} style={styles.photo} />
          </Pressable>
        )}
        numColumns={3}
        onEndReached={getPhotos}
        onEndReachedThreshold={0.4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
});

export default ImagePickerScreen;

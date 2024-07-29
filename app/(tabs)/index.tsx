import { useNavigation } from '@react-navigation/native';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ListScreen from './ListScreen';
import MapScreen from './MapScreen';
import { WHITE } from '@/constants/Colors';
// tab의 인덱스
// 파일명이랑 똑같이 안줘도 됨. 하지만 똑같이 안주면 헷갈리겠지...
const HomeScreen = () => {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const height = useWindowDimensions().height / 4;
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      {/** 타이틀 */}
      <View style={styles.topContainer}>
        <Image
          source={require('../../assets/images/icon2.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>PlacePhotos</Text>
      </View>

      {/** 타임라인 */}
      <View style={styles.buttonContiner}>
        <Pressable onPress={() => navigation.navigate('ListScreen')}>
          <Image
            source={require('../../assets/images/home-clock.png')}
            style={[styles.image, { height }]}
          />
          <Text style={styles.buttontitle}>타임라인</Text>
        </Pressable>
      </View>

      {/** 지도 */}
      <View style={styles.buttonContiner}>
        <Pressable onPress={() => navigation.navigate('MapScreen')}>
          <Image
            source={require('../../assets/images/home-map.png')}
            style={[styles.image, { height }]}
          />
          <Text style={styles.buttontitle}>지도</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: WHITE,
    paddingHorizontal: 20,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginLeft: 10,
  },
  buttonContiner: {
    marginVertical: 20,
  },
  image: { width: '100%', borderRadius: 30 },
  buttontitle: {
    position: 'absolute',
    left: 30,
    bottom: 30,
    color: WHITE,
    fontSize: 40,
    fontWeight: '700',
  },
});

export default HomeScreen;

import { GRAY, WHITE } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const SelectPhotosScreen = () => {
  const width = useWindowDimensions().width;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        이미지는 최대 4장까지 선택가능합니다.
      </Text>
      <View style={{ width, height: width }}>
        <Pressable
          style={styles.photoButton}
          onPress={() => navigation.navigate('ImagePickerScreen')}
        >
          <MaterialCommunityIcons
            name="image-plus"
            size={80}
            color={GRAY.DEFAULT}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  description: {
    color: GRAY.DARK,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  photoButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GRAY.LIGHT,
  },
});

export default SelectPhotosScreen;

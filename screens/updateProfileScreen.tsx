import { useUserState } from '@/api/UserContext';
import Button from '@/components/Button';
import FastImage from '@/components/FastImage';
import SafeInputView from '@/components/SafeInputView';
import { GRAY, WHITE } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

const updateProfileScreen = () => {
  const navigation = useNavigation();
  const [user] = useUserState();
  return (
    <SafeInputView>
      <View style={styles.continer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <View style={styles.photo}>
          <FastImage source={{ uri: user.photoURL }} style={styles.photo} />
          <Pressable style={styles.imageButton} onPress={() => {}}>
            <MaterialCommunityIcons name="image" size={20} color={WHITE} />
          </Pressable>
          <View></View>
          <TextInput
            value={user.displayName}
            style={styles.input}
            placeholder="nickName"
            textAlign="center"
            maxLength={10}
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="none"
          />
        </View>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  imageButton: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GRAY.DARK,
  },
  input: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 200,
    fontSize: 20,
    borderBottomWidth: 0.5, //선의 굵기
    borderBottomColor: GRAY.DEFAULT,
  },
});

export default updateProfileScreen;

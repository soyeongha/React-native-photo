import { signOut } from '@/api/auth';
import { useUserState } from '@/api/UserContext';
import Button from '@/components/Button';
import DangerAlert, { AlertTypes } from '@/components/DangerAlert';
import FastImage from '@/components/FastImage';
import { GRAY, WHITE } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  //const [user, setUser] = useUserState();
  const [visible, setVisible] = useState(false);
  const { top } = useSafeAreaInsets();
  const user = {
    email: 'me@email.com',
    password: 'a12345',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/rn-photo-86586.appspot.com/o/panda.png?alt=media&token=fd180754-7cb8-40ff-abea-cf4659d7511c',
    displayName: 'test',
  };
  
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <DangerAlert
        visible={visible}
        onClose={() => setVisible(false)}
        alertType={AlertTypes.LOGOUT}
        onConfirm = {async () => {
          await signOut();
          // setUser({});
        }}
      />
      {/* 나가기버튼 */}
      <View style={styles.settingButton}>
        <Pressable
          onPress={() => {
            setVisible(true);
          }}
          hitSlop={10}
        >
          <MaterialCommunityIcons //아이콘은 svg확장자로 다운받거나 직접만들어도된다.
            name="logout-variant"
            size={24}
            color={GRAY.DARK}
          />
        </Pressable>
      </View>

      {/* 프로파일 */}
      <View style={styles.profile}>
        <View
          style={[
            styles.photo,
            user.photoURL || { backgroundColor: GRAY.DEFAULT },
          ]}
        >
          <FastImage source={{ uri: user.photoURL }} style={styles.photo} />
          <Pressable style={styles.editButton}>
            <MaterialCommunityIcons name="pencil" size={20} color={WHITE} />
          </Pressable>
        </View>
        <Text style={styles.nickname}>{user.displayName || 'nickname'}</Text>
      </View>
      {/* 내가 올린사진 목록 */}
      <View style={styles.listContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  settingButton: {
    paddingHorizontal: 20,
    alignItems: 'flex-end', //진행방향의 수직정렬// 오른쪽에 붙게만듬
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5, //테두리 굵기
    borderBottomColor: GRAY.DEFAULT,
    paddingBottom: 20,
  },
  photo: {
    //동그란 이미지
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute', //무조건 위치지정필수 안하면 왼쪽으로붙음
    bottom: 0,
    right: 0, // 오른쪽하단구석으로 내려옴
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GRAY.DARK,
  },
  nickname: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '700', //굵기
  },
  listContainer: {
    flex: 1, //전체영역을 채우면 동그란 이미지가 위쪽으로 올라가게된다.
  },
});

export default ProfileScreen;

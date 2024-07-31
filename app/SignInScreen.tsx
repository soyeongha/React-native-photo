import {
  authFormReducer,
  AuthFormTypes,
  initAuthForm,
} from '@/components/authFormReducer';
import Button from '@/components/Button';
import HR from '@/components/Hr';
import Input, { InputTypes, ReturnKeyTypes } from '@/components/Input';
import SafeInputView from '@/components/SafeInputView';
import { WHITE } from '@/constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { Alert, Image, Keyboard, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getAuthErrorMessages, signIn } from '../api/auth';
import { useUserState } from '@/api/UserContext';

// const [, setUser] = useUserState();
//루트 인덱스
const SignInScreen = () => {
  const passwordRef = useRef();
  const { top, bottom } = useSafeAreaInsets();
  const [form, dispatch] = useReducer(authFormReducer, initAuthForm);

  type Props = {
    email: string;
    password: string;
    passwordConfirm?: string;
    disabled: boolean;
    isLoading: boolean;
  };

  const onSubmit = async () => {
    // 버튼 누르면 키보드 없앰
    Keyboard.dismiss(); // 키보드 감춤
    if (!form.disabled && !form.isLoading) {
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING });
      try {
        const user = await signIn(form); //정상적 로그인출력문
        // setUser(user);
        console.log(user);
      } catch (e) {
        const message = getAuthErrorMessages(e.code); //에러메세지출력
        Alert.alert('로그인 실패', message, [
          {
            text: '확인',
            onPress: () => dispatch({ type: AuthFormTypes.TOGGLE_LOADING }),
          },
        ]);
      }
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING }); //로딩 다 됐을때
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log('focus');
      return () => dispatch({ type: AuthFormTypes.RESET });
    }, [])
  );

  const updateForm = (payload: Props) => {
    const newForm = { ...form, ...payload };
    const disabled = !newForm.email || !newForm.password;

    dispatch({
      type: AuthFormTypes.UPDATE_FORM,
      payload: { disabled, ...payload },
    });
  }; // 새로 들어온 값 보여줌

  return (
    // StatusBar style이 light면 검정글자로 나옴
    <SafeInputView>
      <StatusBar style="light" />
      <View style={[styles.container, { paddingTop: top }]}>
        {/* 배경이미지 */}
        <View style={StyleSheet.absoluteFill}>
          <Image
            source={require('../assets/images/cover.png')}
            style={{ width: '100%' }}
            resizeMode="cover" //사진 꽉차게, 넘치는 부분은 잘림
          />
        </View>

        {/* 컨텐츠영역 */}
        <View
          style={[styles.form, { paddingBottom: bottom ? bottom + 10 : 40 }]}
        >
          <Input
            value={form.email}
            onChangeText={(text) => updateForm({ email: text.trim() })}
            inputType={InputTypes.EMAIL}
            returnKeyType={ReturnKeyTypes.NEXT}
            styles={inputStyles}
            onSubmitEditing={() => passwordRef.current.focus()} // 엔터(다음키) 눌렀을때 커서 이동
          />
          <Input
            ref={passwordRef}
            value={form.password}
            onChangeText={(text) => updateForm({ password: text.trim() })}
            inputType={InputTypes.PASSWORD}
            returnKeyType={ReturnKeyTypes.DONE}
            styles={inputStyles}
            onSubmitEditing={onSubmit} //엔터(다음키) 눌렀을때 onSubmit 실행
          />
          <Button
            title="Sign In"
            onPress={onSubmit}
            disabled={form.disabled}
            isLoading={form.isLoading}
            styles={{ button: { borderRadius: 8 } }}
          />
          <HR text="OR" styles={{ container: { marginTop: 30 } }} />
          <Link
            href="SignUpScreen"
            style={{ paddingHorizontal: 20, marginTop: 20 }}
          >
            회원가입
          </Link>
        </View>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //가로정렬하고싶다?!! => flexDirection :'row' 적어주기
    justifyContent: 'flex-end', // flex-start는 login 영역이 위로 올라감
  },
  form: {
    alignItems: 'center', // 세로가운데정렬
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingTop: 40, // 배경색 흰색이 유지가 됨
    borderTopLeftRadius: 20, // 따로따로 주는 이유는 한쪽면에만 둥근모서리를 적용하기 위해서
    borderTopRightRadius: 20, // 위와 마찬가지
  },
});

const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default SignInScreen;

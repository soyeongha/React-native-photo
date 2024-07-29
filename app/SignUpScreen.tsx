import { getAuthErrorMessages, signUp } from '@/api/auth';
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
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useReducer, useRef } from 'react';
import { Alert, Image, Keyboard, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SignUpScreen = () => {
  const passwordRef = useRef();
  const { top, bottom } = useSafeAreaInsets();
  const [, setUser] = useUserState();
  const [form, dispatch] = useReducer(authFormReducer, initAuthForm);
  const passwordConfirmRef = useRef();

  type Props = {
    email: string;
    password: string;
    passwordConfirm?: string;
    disabled: boolean;
    isLoading: boolean;
  };

  const updateForm = (payload: Props) => {
    const newForm = { ...form, ...payload };
    const disabled =
      !newForm.email ||
      !newForm.password ||
      !newForm.password !== newForm.passwordConfirm;

    dispatch({
      type: AuthFormTypes.UPDATE_FORM,
      payload: { disabled, ...payload },
    });
  };

  const onSubmit = async () => {
    // 버튼 누르면 키보드 없앰
    Keyboard.dismiss(); // 키보드 감춤
    if (!form.disabled && !form.isLoading) {
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING });
      console.log(form.email, form.password); // 나중에 (tabs)의 index.tsx로 이동하는 코드 넣을거임
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING }); //로딩 다 됐을때
      try {
        const user = await signUp(form);
        setUser(user);
      } catch (e) {
        const message = getAuthErrorMessages(e.code);
        Alert.alert('회원가입 실패', message, [
          {
            text: '확인',
            onPress: () => dispatch({ type: AuthFormTypes.TOGGLE_LOADING }),
          },
        ]);
      }
    }
  };

  return (
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
            styles={{ container: { marginBottom: 20 } }}
            onSubmitEditing={() => passwordRef.current.focus()} // 엔터(다음키) 눌렀을때 커서 이동
          />
          <Input
            ref={passwordRef}
            value={form.password}
            onChangeText={(text) => updateForm({ password: text.trim() })}
            inputType={InputTypes.PASSWORD}
            returnKeyType={ReturnKeyTypes.NEXT}
            styles={{ container: { marginBottom: 20 } }}
            onSubmitEditing={() => passwordConfirmRef.current.focus()} //엔터(다음키) 눌렀을때 onSubmit 실행
          />

          <Input
            ref={passwordConfirmRef}
            value={form.passwordConfirm}
            onChangeText={(text) =>
              updateForm({ passwordConfirm: text.trim() })
            }
            inputType={InputTypes.PASSWORD_CONFIRM} // input.tsx의 password_confirm에서 내용 변경 가능
            returnKeyType={ReturnKeyTypes.DONE}
            styles={{ container: { marginBottom: 20 } }}
            onSubmitEditing={onSubmit} //엔터(다음키) 눌렀을때 onSubmit 실행
          />

          <Button
            title="회원 가입"
            onPress={onSubmit}
            disabled={form.disabled}
            isLoading={form.isLoading}
            styles={{ button: { borderRadius: 8 } }}
          />

          <HR text="OR" styles={{ container: { marginTop: 30 } }} />

          <Link href="/" style={{ paddingHorizontal: 20, marginTop: 20 }}>
            로그인
          </Link>
        </View>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
export default SignUpScreen;

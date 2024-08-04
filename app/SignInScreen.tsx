import {
  authFormReducer,     // 폼 상태 관리를 위한 리듀서
  AuthFormTypes,       // 리듀서에서 사용하는 액션 타입들
  initAuthForm,        // 폼의 초기 상태
} from '@/components/authFormReducer';
import Button from '@/components/Button';    // 커스텀 버튼 컴포넌트
import HR from '@/components/Hr';            // 수평선(Horizontal Rule) 컴포넌트
import Input, { InputTypes, ReturnKeyTypes } from '@/components/Input'; // 커스텀 입력 필드 컴포넌트
import SafeInputView from '@/components/SafeInputView'; // 키보드가 화면을 가리지 않도록 해주는 컴포넌트
import { WHITE } from '@/constants/Colors';   // 색상 상수
import { useFocusEffect } from '@react-navigation/native'; // 화면 포커스 상태 관리 훅
import { Link } from 'expo-router';           // 페이지 간 이동을 위한 링크 컴포넌트
import { StatusBar } from 'expo-status-bar';  // 상태 바 스타일 설정
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { Alert, Image, Keyboard, StyleSheet, Text, View } from 'react-native'; // React Native 기본 컴포넌트들
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 안전 영역(노치 등) 패딩 적용을 위한 훅
import { getAuthErrorMessages, signIn } from '../api/auth'; // 인증 API와 오류 메시지 관련 함수
import { useUserState } from '@/api/UserContext'; // 사용자 상태 관리를 위한 커스텀 훅

// const [, setUser] = useUserState();
//루트 인덱스
//React Native와 Expo를 사용해 로그인 화면을 구현, 이메일과 비밀번호를 입력한 후, 로그인 버튼을 누르면 로그인 요청이 전송됩니다. 
//로그인이 성공하면 사용자 정보를 설정할 수 있지만,에러가 발생하면 오류 메시지를 사용자에게 보여줍니다. 또한, 화면이 포커스를 잃거나 다른 페이지로 이동하면 폼이 초기화됩니다.
const SignInScreen = () => {
  const passwordRef = useRef(); // 비밀번호 입력 필드를 참조하는 변수
  const { top, bottom } = useSafeAreaInsets(); // 안전 영역 패딩 계산
  const [form, dispatch] = useReducer(authFormReducer, initAuthForm); // 폼 상태 관리

  type Props = { // 폼 상태의 타입 정의
    email: string;
    password: string;
    passwordConfirm?: string;
    disabled: boolean;
    isLoading: boolean;
  };

  const onSubmit = async () => {
    Keyboard.dismiss(); // 버튼을 누르면 키보드가 닫힘
    if (!form.disabled && !form.isLoading) {
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING }); // 로딩 상태로 전환
      try {
        const user = await signIn(form); // 로그인 시도
        console.log(user); // 성공적으로 로그인되면 사용자 정보 출력
        // setUser(user); // 로그인 성공 시 사용자 상태 설정 (주석 처리됨)
      } catch (e) {
        const message = getAuthErrorMessages(e.code); // 오류 메시지 가져오기
        Alert.alert('로그인 실패', message, [
          {
            text: '확인',
            onPress: () => dispatch({ type: AuthFormTypes.TOGGLE_LOADING }), // 오류 발생 시 로딩 상태 해제
          },
        ]);
      }
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING }); // 로딩 상태 해제
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log('focus');
      return () => dispatch({ type: AuthFormTypes.RESET }); // 화면을 벗어날 때 폼 상태 초기화
    }, [])
  );

  const updateForm = (payload: Props) => { // 폼 상태를 업데이트하는 함수
    const newForm = { ...form, ...payload };
    const disabled = !newForm.email || !newForm.password; // 이메일과 비밀번호가 모두 입력되지 않으면 버튼 비활성화

    dispatch({
      type: AuthFormTypes.UPDATE_FORM, // 폼 상태 업데이트 액션
      payload: { disabled, ...payload },
    });
  };

  return (
    <SafeInputView> {/* 키보드가 화면을 가리지 않도록 하는 컴포넌트 */}
      <StatusBar style="light" /> {/* 상태 바 스타일 설정 */}
      <View style={[styles.container, { paddingTop: top }]}>
        {/* 배경 이미지 */}
        <View style={StyleSheet.absoluteFill}>
          <Image
            source={require('../assets/images/cover.png')}
            style={{ width: '100%' }}
            resizeMode="cover" // 사진이 영역을 꽉 채우도록 설정, 넘치는 부분은 잘림
          />
        </View>

        {/* 컨텐츠 영역 */}
        <View style={[styles.form, { paddingBottom: bottom ? bottom + 10 : 40 }]}>
          <Input
            value={form.email} // 이메일 입력값
            onChangeText={(text) => updateForm({ email: text.trim() })} // 입력값을 업데이트
            inputType={InputTypes.EMAIL} // 입력 타입 설정 (이메일)
            returnKeyType={ReturnKeyTypes.NEXT} // 키보드의 "다음" 키 설정
            styles={inputStyles}
            onSubmitEditing={() => passwordRef.current.focus()} // 엔터 키 누르면 비밀번호 필드로 포커스 이동
          />
          <Input
            ref={passwordRef} // 비밀번호 입력 필드를 참조
            value={form.password} // 비밀번호 입력값
            onChangeText={(text) => updateForm({ password: text.trim() })} // 입력값을 업데이트
            inputType={InputTypes.PASSWORD} // 입력 타입 설정 (비밀번호)
            returnKeyType={ReturnKeyTypes.DONE} // 키보드의 "완료" 키 설정
            styles={inputStyles}
            onSubmitEditing={onSubmit} // 엔터 키 누르면 onSubmit 함수 실행
          />
          <Button
            title="Sign In" // 버튼에 표시될 텍스트
            onPress={onSubmit} // 버튼 클릭 시 onSubmit 함수 실행
            disabled={form.disabled} // 폼 상태에 따라 버튼 비활성화 여부 결정
            isLoading={form.isLoading} // 로딩 중일 때 로딩 상태 표시
            styles={{ button: { borderRadius: 8 } }} // 버튼 스타일
          />
          <HR text="OR" styles={{ container: { marginTop: 30 } }} /> {/* 수평선과 함께 OR 텍스트 표시 */}
          <Link
            href="SignUpScreen" // 회원가입 페이지로 이동하는 링크
            style={{ paddingHorizontal: 20, marginTop: 20 }}
          >
            회원가입 {/* 링크 텍스트 */}
          </Link>
        </View>
      </View>
    </SafeInputView>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 채우는 컨테이너
    justifyContent: 'flex-end', // 로그인 폼을 하단에 배치
  },
  form: {
    alignItems: 'center', // 폼 내의 요소들을 수직으로 중앙 정렬
    backgroundColor: WHITE, // 폼의 배경색을 흰색으로 설정
    paddingHorizontal: 20,
    paddingTop: 40,
    borderTopLeftRadius: 20, // 상단 왼쪽 모서리를 둥글게
    borderTopRightRadius: 20, // 상단 오른쪽 모서리를 둥글게
  },
});

const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 20, // 입력 필드 간의 여백
    paddingHorizontal: 20, // 입력 필드의 좌우 패딩
  },
  input: {
    borderWidth: 1, // 입력 필드의 테두리 두께
    borderRadius: 8, // 입력 필드의 모서리를 둥글게
  },
});

export default SignInScreen; // SignInScreen 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄

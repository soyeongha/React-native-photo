import { getAuthErrorMessages, signUp } from '@/api/auth'; // 인증 관련 API와 오류 메시지 함수 임포트
import {
  authFormReducer,
  AuthFormTypes,
  initAuthForm,
} from '@/components/authFormReducer'; // 폼 상태 관리를 위한 리듀서 및 관련 타입 임포트
import Button from '@/components/Button'; // 커스텀 버튼 컴포넌트 임포트
import HR from '@/components/Hr'; // 수평선(Horizontal Rule) 컴포넌트 임포트
import Input, { InputTypes, ReturnKeyTypes } from '@/components/Input'; // 커스텀 입력 필드 컴포넌트 임포트
import SafeInputView from '@/components/SafeInputView'; // 키보드가 화면을 가리지 않도록 해주는 컴포넌트 임포트
import { WHITE } from '@/constants/Colors'; // 색상 상수 임포트
import { Link } from 'expo-router'; // 페이지 간 이동을 위한 링크 컴포넌트 임포트
import { StatusBar } from 'expo-status-bar'; // 상태 바 스타일 설정
import { useReducer, useRef } from 'react'; // React 훅 임포트
import { Alert, Image, Keyboard, StyleSheet, View } from 'react-native'; // React Native 기본 컴포넌트 임포트
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 안전 영역(노치 등) 패딩 적용을 위한 훅 임포트

// 회원가입 화면 컴포넌트 정의
const SignUpScreen = () => {
  const passwordRef = useRef(); // 비밀번호 입력 필드를 참조하는 변수
  const { top, bottom } = useSafeAreaInsets(); // 안전 영역 패딩 계산
  const [, setUser] = useUserState(); // 사용자 상태 설정 함수
  const [form, dispatch] = useReducer(authFormReducer, initAuthForm); // 폼 상태 관리
  const passwordConfirmRef = useRef(); // 비밀번호 확인 입력 필드를 참조하는 변수

  // 폼 상태 타입 정의
  type Props = {
    email: string; // 사용자가 입력한 이메일
    password: string;  // 사용자가 입력한 비밀번호
    passwordConfirm?: string;  // 사용자가 입력한 비밀번호 확인 (선택적)
    disabled: boolean;  // 폼이 비활성화 상태인지 여부
    isLoading: boolean;  // 로딩 중인지 여부
  };

  // 폼 상태를 업데이트하는 함수, payload로 전달된 값과 현재 폼 상태(form)를 병합하여 newForm이라는 새로운 폼 상태 객체를 만듬.
  const updateForm = (payload: Props) => {//payload는 새로운 폼 데이터입니다. 사용자가 입력한 새로운 값이 여기에 담깁니다.
    const newForm = { ...form, ...payload };  // 기존 폼 상태와 새로운 값을 병합하여 새로운 폼 상태 생성
    const disabled =  // 비활성화 여부 결정
      !newForm.email ||  // 이메일이 비어있으면 disabled는 true
      !newForm.password ||  // 비밀번호가 비어있으면 disabled는 true
      !newForm.password !== newForm.passwordConfirm;  // 비밀번호와 비밀번호 확인이 일치하지 않으면 disabled는 true
     //이 중 하나라도 참(true)이면, 폼은 비활성화 상태가 됩니다.

    dispatch({ // 폼 상태를 업데이트하는 액션을 디스패치
      type: AuthFormTypes.UPDATE_FORM, // 폼 상태 업데이트
      payload: { disabled, ...payload },  //payload에는 disabled 상태와 함께 새롭게 업데이트된 폼 데이터가 담김, 새로운 폼 상태와 비활성화 여부를 함께 전송
    });
  };

  // 회원가입 요청을 처리하는 함수
  const onSubmit = async () => {
    Keyboard.dismiss(); // 버튼을 누르면 키보드가 닫힘
    if (!form.disabled && !form.isLoading) {
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING }); // 로딩 상태로 전환
      console.log(form.email, form.password); // 나중에 (tabs)의 index.tsx로 이동하는 코드 넣을거임
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING }); // 로딩 상태 해제
      try {
        const user = await signUp(form); // 회원가입 시도
        setUser(user); // 회원가입 성공 시 사용자 상태 설정
      } catch (e) {
        const message = getAuthErrorMessages(e.code); // 오류 메시지 가져오기
        Alert.alert('회원가입 실패', message, [
          {
            text: '확인',
            onPress: () => dispatch({ type: AuthFormTypes.TOGGLE_LOADING }), // 오류 발생 시 로딩 상태 해제
          },
        ]);
      }
    }
  };

  return (
    <SafeInputView> {/* 키보드가 화면을 가리지 않도록 하는 컴포넌트 */}
      <StatusBar style="light" /> {/* 상태 바 스타일 설정 */}
      <View style={[styles.container, { paddingTop: top }]}>
        {/* 배경 이미지 */}
        <View style={StyleSheet.absoluteFill}>
          <Image
            source={require('../assets/images/cover.png')} // 배경 이미지 경로
            style={{ width: '100%' }} // 이미지의 너비를 100%로 설정
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
            styles={{ container: { marginBottom: 20 } }} // 입력 필드 스타일
            onSubmitEditing={() => passwordRef.current.focus()} // 엔터 키 누르면 비밀번호 필드로 포커스 이동
          />
          <Input
            ref={passwordRef} // 비밀번호 입력 필드를 참조
            value={form.password} // 비밀번호 입력값
            onChangeText={(text) => updateForm({ password: text.trim() })} // 입력값을 업데이트
            inputType={InputTypes.PASSWORD} // 입력 타입 설정 (비밀번호)
            returnKeyType={ReturnKeyTypes.NEXT} // 키보드의 "다음" 키 설정
            styles={{ container: { marginBottom: 20 } }} // 입력 필드 스타일
            onSubmitEditing={() => passwordConfirmRef.current.focus()} // 엔터 키 누르면 비밀번호 확인 필드로 포커스 이동
          />
          <Input
            ref={passwordConfirmRef} // 비밀번호 확인 입력 필드를 참조
            value={form.passwordConfirm} // 비밀번호 확인 입력값
            onChangeText={(text) => updateForm({ passwordConfirm: text.trim() })} // 입력값을 업데이트
            inputType={InputTypes.PASSWORD_CONFIRM} // 입력 타입 설정 (비밀번호 확인)
            returnKeyType={ReturnKeyTypes.DONE} // 키보드의 "완료" 키 설정
            styles={{ container: { marginBottom: 20 } }} // 입력 필드 스타일
            onSubmitEditing={onSubmit} // 엔터 키 누르면 onSubmit 함수 실행
          />
          <Button
            title="회원 가입" // 버튼에 표시될 텍스트
            onPress={onSubmit} // 버튼 클릭 시 onSubmit 함수 실행
            disabled={form.disabled} // 폼 상태에 따라 버튼 비활성화 여부 결정
            isLoading={form.isLoading} // 로딩 중일 때 로딩 상태 표시
            styles={{ button: { borderRadius: 8 } }} // 버튼 스타일
          />
          <HR text="OR" styles={{ container: { marginTop: 30 } }} /> {/* 수평선과 함께 OR 텍스트 표시 */}
          <Link href="/" style={{ paddingHorizontal: 20, marginTop: 20 }}> {/* 로그인 페이지로 이동하는 링크 */}
            로그인 {/* 링크 텍스트 */}
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
    paddingHorizontal: 20, // 좌우 패딩 설정
    paddingTop: 40, // 상단 패딩 설정
    borderTopLeftRadius: 20, // 상단 왼쪽 모서리를 둥글게
    borderTopRightRadius: 20, // 상단 오른쪽 모서리를 둥글게
  },
});

export default SignUpScreen; // SignUpScreen 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄

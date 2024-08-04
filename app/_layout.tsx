import { Stack } from 'expo-router';
// Stack은 화면을 쌓아가는 구조로, 이전 화면으로 돌아갈 수 있는 네비게이션 방식을 제공한다.
// 루트의 레이아웃
const RootLayout = () => {
  // 화면단위 페이지, 페이지 보여줄거는 여기다가 파일명 적어주기
  // tabs는 폴더 이름 뜻함
  //headerShown:false -> 헤더부분 사라짐
  // Stack과 Tab의 차이 알아두기
  // Stack은 하나씩 쌓아가는 구조
  //screenOptions: 각 화면의 옵션을 설정할 수 있다. headerShown: false 옵션으로 모든 화면의 헤더(상단 바)를 숨겼다.

  return (
    <Stack screenOptions={{ headerShown: false }}> 
      <Stack.Screen name="Index" />                {/*메인페이지*/}
      <Stack.Screen name="SignInScreen" />         {/*로그인 화면*/}
      <Stack.Screen name="SignUpScreen" />         {/*회원가입 화면*/}
      <Stack.Screen name="ImagePickerScreen" />    {/*이미지 선택 화면*/}
      <Stack.Screen name="../components/" />       {/*'components' 폴더 내의 파일을 가져오려고 하지만, 파일명을 명시하지 않아서 오류가 발생할 수 있습니다. 
          보통 이런 형태는 동적으로 폴더 내의 여러 컴포넌트를 로드하려 할 때 사용합니다.*/}
      <Stack.Screen name="+not-found" />           {/*잘못된 경로로 접근했을 때 표시되는 404 페이지입니다.*/}
      <Stack.Screen name="updateProfileScreen" />  {/*프로필 업데이트 화면*/}
    </Stack>
  );
};

export default RootLayout;

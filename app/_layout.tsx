import { Stack } from 'expo-router';
// 루트의 레이아웃
const RootLayout = () => {
  // 화면단위 페이지, 페이지 보여줄거는 여기다가 파일명 적어주기
  // tabs는 폴더 이름 뜻함
  //headerShown:false -> 헤더부분 사라짐
  // Stack과 Tab의 차이 알아두기
  // Stack은 하나씩 쌓아가는 구조

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Index" />
      <Stack.Screen name="SignInScreen" />
      <Stack.Screen name="SignUpScreen" />
      <Stack.Screen name="ImagePickerScreen" />
      <Stack.Screen name="../components/" />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="updateProfileScreen" />
    </Stack>
  );
};

export default RootLayout;

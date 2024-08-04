import { Text, View } from 'react-native';
//특정 페이지를 찾을 수 없을 때 사용자에게 "페이지를 찾을 수 없습니다."라는 메시지를 보여주는 역할
const notfound = () => {
  return (
    <View>
      <Text>페이지를 찾을 수 없습니다.</Text>
    </View>
  );
};

export default notfound; //컴포넌트를 모듈의 기본 내보내기로 설정하여,
//다른 파일에서 import notfound from './파일이름' 형태로 이 컴포넌트를 쉽게 가져와 사용할 수 있게 합니다.

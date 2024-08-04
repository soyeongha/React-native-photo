import HeaderRight from '@/components/HeaderRight'; // 이 컴포넌트는 헤더에 표시될 버튼을 나타냅니다.
import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅으로, 네비게이션 객체에 접근하여 화면 전환 등을 처리합니다.
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'; // React 훅들, 상태 관리와 라이프사이클 관련 작업을 처리
import { //기본 컴포넌트를 사용하여 UI를 구성합니다.
  Alert, // 경고창 컴포넌트
  FlatList,  // 스크롤 가능한 리스트 컴포넌트
  Image,    // 이미지 컴포넌트
  Pressable,  // 클릭 가능한 영역 컴포넌트
  StyleSheet,  // 스타일시트 생성 도구
  Text,
  useWindowDimensions,// 창 크기 관련 훅
  View,
} from 'react-native';
import * as MediaLibray from 'expo-media-library';// 미디어 라이브러리 접근을 위한 Expo 모듈, 사진 접근 권한 요청과 사진 불러오기를 처리합니다.

//ImagePickerScreen 컴포넌트를 통해 사용자가 디바이스의 사진 라이브러리에 접근하고 사진을 선택할 수 있는 화면을 구현
//컴포넌트 기능(사진 접근 권한 요청),(사진 목록 불러오기),(사진 그리드 UI 렌더링),(헤더에 커스텀 버튼 추가)

const initialListInfo = {endCursor: '', hasNextPage: true};  // 사진 목록을 불러올 때 초기 상태를 정의합니다.

const ImagePickerScreen = () => {// ImagePickerScreen 컴포넌트를 정의합니다.
  const [refreshing, setRefreshing] = useState(false); // 사진 목록 새로고침 상태를 관리하는 state를 선언합니다.
  const navigation = useNavigation();//화면 간 전환을 위한 네비게이션 객체를 가져옵니다.
  const [status, requestPermission] = MediaLibray.usePermissions();  //MediaLibrary에서 제공하는 훅을 사용해 미디어 접근 권한 상태를 관리하고, 권한을 요청하는 함수를 가져옵니다
  const width = useWindowDimensions().width / 3;  // 화면 너비를 3으로 나누어 한 개의 사진이 차지할 크기를 계산합니다.
  const [photos, setPhotos] = useState([]); // 불러온 사진 목록을 저장하는 상태, 배열 형태로 저장됨
  const [listInfo, setListInfo] = useState({  //사진 불러오기에 대한 정보를 담고 있는 상태
    endCursor: '', //마지막으로 불러온 사진 위치를 나타냄
    hasNextPage: true, //더 불러올 사진이 있는지 여부를 나타냄.
  });

  // useEffect: 컴포넌트가 처음 렌더링될 때 사진 접근 권한을 요청합니다.
  useEffect(() => {
    (async () => {
      const { granted } = await requestPermission();// 권한을 요청하고 결과를 가져옵니다.
       // 권한이 거부된 경우 경고창을 띄우고, 뒤로 돌아갑니다.
      if (!granted) {
        Alert.alert('사진접근권한', '사진 접근 권한이 필요합니다', [
          {
            text: '확인',
            onPress: () => {
              navigation.canGoBack() && navigation.goBack();
            },  //사용자가 권한을 부여하지 않으면, 권한이 필요하다는 경고 메시지를 표시하고, 사용자를 이전 화면으로 되돌림.
          },
        ]);
      }
    })();
  }, [navigation, requestPermission]);  // 의존성 배열에 navigation과 requestPermission을 추가

  console.log(status);  // 현재 권한 상태를 콘솔에 출력합니다.

  // 사진 목록을 가져오는 함수. getPhotos 함수는 useCallback으로 메모이제이션되어, 의존성 배열이 변경될 때만 새로 생성됩니다. 
  //이 함수는 MediaLibrary에서 사진 목록을 가져오고, 이를 상태에 저장합니다.
  const getPhotos = useCallback(async () => {
    const options = {
      first: 30,  // 한 번에 불러올 사진 개수
      SortBy: [MediaLibray.SortBy.creationTime], // sortBy는 정렬 기준, 사진의 생성 시간으로 정렬
    };
    if (listInfo.endCursor) {  // 마지막으로 불러온 사진 이후부터 새로운 사진을 가져오기 위해 after 옵션을 설정.
      options['after'] = listInfo.endCursor; 
    }

    if (listInfo.hasNextPage) { //추가로 불러올 사진이 있는 경우에만 새로운 사진을 가져옵니다.
      const { assets, endCursor, hasNextPage } = 
        await MediaLibray.getAssetsAsync(options);  // 사진들을 가져옵니다.
      setPhotos((prev) => [...prev, ...assets]); // 기존 사진 목록에 새로 불러온 사진들을 추가.
      setListInfo({ endCursor, hasNextPage });  // 불러온 사진 목록의 마지막위치와 추가 사진유무 정보 업데이트
    }
  }, [listInfo.hasNextPage, listInfo.endCursor]); // 의존성 배열에 listInfo의 상태를 추가

  console.log(photos.length);  // 불러온 사진 개수를 콘솔에 출력합니다.

  // 사진 접근 권한이 허용되었을 때, getPhotos를 호출하여 사진 목록을 불러옵니다.
  useEffect(() => {
    if (status?.granted) {
      getPhotos();
    }
  }, [status?.granted]); // 권한 상태가 변경될 때마다 실행

  // 화면 레이아웃이 마운트될 때 헤더에 버튼을 추가함 .useLayoutEffect를 사용해 화면이 렌더링될 때 네비게이션 헤더에 HeaderRight 컴포넌트 커스텀 버튼을 추가합니다.
  useLayoutEffect(() => {
    navigation.setOptions({
      HeaderRight: () => <HeaderRight onPress={() => {}} />, // 헤더에 추가할 버튼 컴포넌트
    });
  }, [navigation]); // 의존성 배열에 navigation을 추가

  return (
    <View style={styles.container}>
      <FlatList   {/* FlatList 컴포넌트는 스크롤 가능한 리스트를 그리드형식으로 생성. */}
        style={styles.list}
        data={photos}  //photos 상태에 저장된 불러온 사진 목록을 FlatList(리스트)에 전달
        renderItem={({ item }) => ( //renderItem: 각 사진을 어떻게 렌더링할지를 정의
          <Pressable style={{ width, height: width }}>  {/*각 사진은 Pressable로 감싸져 있어 클릭할 수 있다. */}
            <Image source={{ uri: item.uri }} style={styles.photo} />  {/*Image 컴포넌트로 실제 사진을 화면에 표시. */}
          </Pressable>
        )}
        numColumns={3} // 한 행에 3개의 사진을 보여줍니다.
        onEndReached={getPhotos}  // 스크롤이 리스트 끝에 도달했을 때 getPhotos 함수가 호출되어 추가 사진을 불러옵니다.
        onEndReachedThreshold={0.4}  //리스트의 끝에서 몇 % 남았을 때 onEndReached를 호출할지 결정함. 여기서는 40%로 설정
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {  //화면을 중앙에 배치하고, 자식 요소들이 부모 요소에 맞게 자동으로 크기를 조정하도록 설정.
    flex: 1,  // 화면을 채우도록 설정
    justifyContent: 'center',  // 수직 방향으로 중앙 정렬
    alignItems: 'center',  // 수평 방향으로 중앙 정렬
  },
  list: {
    width: '100%',  // 리스트가 화면 전체 너비를 차지하도록 설정
  },
  photo: { //각 사진의 너비와 높이를 부모 요소에 맞추어 전체 크기를 차지하도록 설정.
    width: '100%',  // 각 사진이 리스트 항목의 너비를 채우도록 설정
    height: '100%',  // 각 사진이 리스트 항목의 높이를 채우도록 설정
  },
});

export default ImagePickerScreen;

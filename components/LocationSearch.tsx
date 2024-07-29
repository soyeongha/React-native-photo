import { GRAY, PRIMARY } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MAP_KEY } from '@/env';
import { forwardRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  styles?: { container?: object; icon?: object }; //스타일 사용 안될수도? 컨테이너 지정 안될수도?
  onPress: () => void;
  isLoading?: boolean;
  isSelected?: boolean;
  iconVisible: boolean;
};

const LocationSearch = forwardRef(
  ({ styles, onPress, isLoading, isSelected, iconVisible }: Props, ref) => {
    const {top} = useSafeAreaInsets();
    return (
      <View style={[defaultStyles.container, styles?.container]}>
        <GooglePlacesAutocomplete
          ref={ref}
          fetchDetails={true}
          styles={{
            container: { flex: 0 },
            textInput: { paddingLeft: iconVisible ? 30 : 10 },
          }}
          placeholder="위치검색"
          onPress={onPress}
          onFail={(e) => console.log('자동완성실패: ', e)}
          query={{ key: MAP_KEY, language: 'ko' }}
          debounce={400} //검색주기 입력하는족족 바로 찾으면 부하가 많이 걸리니까 0.5마다 결과값을 찾는다
          enablePoweredByContainer={false}
          textInputProps={{ editable: !isLoading }}
        />
        {iconVisible && (
          <View style={[defaultStyles.icon, styles?.icon]}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={isSelected ? PRIMARY.DEFAULT : GRAY.LIGHT}
            />
          </View>
        )}
      </View>
    );
  }
);

LocationSearch.propTypes = {
  styles: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isSelected: PropTypes.bool,
  iconVisible: PropTypes.bool,
};

const defaultStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: GRAY.LIGHT,
  },
  icon: {
    position: 'absolute',
    left: 20,
    top: 50,
  },
});

export default LocationSearch;

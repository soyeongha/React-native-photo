import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { GRAY, WHITE } from '@/constants/Colors';

type Props = {
  text?: string;
  styles?: object; // 필수가 아니라서 ? 해주기
};

const HR = ({ text, styles }: Props) => {
  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <View style={[defaultStyles.line, styles?.line]}></View>
      {!!text && <Text style={[defaultStyles.text, styles?.text]}>{text}</Text>}
    </View>
  );
};

HR.propTypes = {
  text: PropTypes.string,
  styles: PropTypes.object,
};

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%', // 가로 꽉 차게
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    ...StyleSheet.absoluteFill, // 책 555 참고
    height: '50%',
    borderBottomWidth: 1,
    borderBottomColor: GRAY.DARK,
  },
  text: {
    backgroundColor: WHITE, // 선 위에 표시할거라 배경색 줌
    paddingHorizontal: 10,
    color: GRAY.DARK,
  },
});

export default HR;

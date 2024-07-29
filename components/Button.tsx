import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { DANGER, GRAY, PRIMARY, WHITE } from '@/constants/Colors';

export const ButtonTypes = {
  PRIMARY: 'PRIMARY',
  DANGER: 'DANGER',
  CANCEL: 'CANCEL',
};

const ButtonTypeColors = {
  PRIMARY: {
    DEFAULT: PRIMARY.DEFAULT,
    LIGHT: PRIMARY.LIGHT,
    DARK: PRIMARY.DARK,
  },
  DANGER: {
    DEFAULT: DANGER.DEFAULT,
    LIGHT: DANGER.LIGHT,
    DARK: DANGER.DARK,
  },
  CANCEL: {
    DEFAULT: GRAY.DEFAULT,
    LIGHT: GRAY.LIGHT,
    DARK: GRAY.DARK,
  },
};

interface Props {
  title: string;
  styles?: object;
  onPress: () => void; //함수형식
  disabled?: boolean;
  isLoading?: boolean;
  buttonType?: string;
}

const Button = ({
  title,
  styles,
  onPress,
  disabled,
  isLoading,
  buttonType,
}: Props) => {
  const Colors = ButtonTypeColors[buttonType];

  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <Pressable
        onPress={() => onPress()}
        disabled={disabled || isLoading}
        style={({ pressed }) => [
          defaultStyles.button,
          styles?.button,
          {
            backgroundColor: (() => {
              switch (true) {
                case disabled || isLoading:
                  return Colors.LIGHT;
                case pressed:
                  return Colors.DARK;
                default:
                  return Colors.DEFAULT;
              }
            })(),
          },
        ]}
      >
        <Text style={[defaultStyles.title, styles?.title]}>{title}</Text>
      </Pressable>
    </View>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  styles: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  buttonType: PropTypes.oneOf(Object.values(ButtonTypes)), // ButtonTypes 여러개중에 하나 골라서 사용.
};

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20, //글씨가 살짝 위로
  },
});

export default Button;

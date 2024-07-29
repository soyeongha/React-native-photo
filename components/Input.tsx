import { MaterialCommunityIcons } from '@expo/vector-icons';
import { forwardRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { BLACK, GRAY, PRIMARY } from '@/constants/Colors';

export const ReturnKeyTypes = {
  DONE: 'done',
  NEXT: 'next',
};
export const InputTypes = {
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
  PASSWORD_CONFIRM: 'PASSWORD_CONFIRM',
};

const PasswordProps = {
  keyboardType: 'default',
  secureTextEntry: true,
  iconName: { active: 'lock', inactive: 'lock-outline' },
};

const InputTypeProps = {
  EMAIL: {
    title: 'EMAIL',
    placeholder: 'your@email.com',
    keyboardType: 'email-address',
    secureTextEntry: false,
    iconName: { active: 'email', inactive: 'email-outline' },
  },
  PASSWORD: {
    title: 'PASSWORD',
    placeholder: 'PASSWORD',
    keyboardType: 'default',
    secureTextEntry: true,
    iconName: { active: 'lock', inactive: 'lock-outline' },
  },
  PASSWORD_CONFIRM: {
    title: 'PASSWORD CONFIRM',
    placeholder: 'PASSWORD CONFIRM',
    ...PasswordProps,
  },
};

interface Props {
  inputType: string;
  returnKeyType: string;
  value: string;
  onChangeText: (text: string) => void;
  styles?: object;
}

const Input = forwardRef(({ inputType, styles, ...props }: Props, ref) => {
  const {
    title,
    placeholder,
    keyboardType,
    secureTextEntry,
    iconName: { active, inactive },
  } = InputTypeProps[inputType];

  const { value } = props;

  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <Text
        style={[
          defaultStyles.title,
          { color: value || isFocused ? PRIMARY.DEFUALT : GRAY.DARK },
          styles?.title,
        ]}
      >
        {title}
      </Text>
      <View>
        <TextInput
          ref={ref}
          {...props}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            defaultStyles.input,
            {
              color: value || isFocused ? PRIMARY.DEFUALT : GRAY.DARK,
              borderColor: value || isFocused ? PRIMARY.DEFUALT : GRAY.DARK,
            },
            styles?.input,
          ]}
          textContentType="none"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={[defaultStyles.icon, styles?.icon]}>
          <MaterialCommunityIcons
            name={isFocused ? active : inactive}
            size={24}
            color={value || isFocused ? PRIMARY.DEFUALT : GRAY.DARK}
          />
        </View>
      </View>
    </View>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  inputType: PropTypes.oneOf(Object.values(InputTypes)).isRequired,
  value: PropTypes.string.isRequired,
  styles: PropTypes.object,
};

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    marginBottom: 4,
    fontWeight: '700',
  },
  input: {
    borderBottomWidth: 1,
    height: 42,
    paddingHorizontal: 10,
    paddingLeft: 40,
  },
  icon: {
    position: 'absolute',
    left: 10,
    height: '100%',
    justifyContent: 'center',
  },
});

export default Input;

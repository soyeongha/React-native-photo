import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import PropTypes from 'prop-types';

const SafeInputView = ({ children }: any) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding' })}
    >
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        {children}
      </Pressable>
    </KeyboardAvoidingView>
  );
};

SafeInputView.propTypes = {
  children: PropTypes.node, // 문서구조
};

export default SafeInputView;

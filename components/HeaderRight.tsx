import { GRAY, PRIMARY } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import PropTypes from 'prop-types';

const HeaderRight = ({ disabled, onPress }) => {
  return (
    <Pressable hitSlop={10} disabled={disables} onPress={onPress}>
      <MaterialCommunityIcons
        name="check"
        size={28}
        color={disabled ? GRAY.DEFAULT : PRIMARY.DEFAULT}
      />
    </Pressable>
  );
};

HeaderRight.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default HeaderRight;

import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { BLACK, DANGER, WHITE } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button, { ButtonTypes } from './Button';

export const AlertTypes = {
  LOGOUT: 'LOGOUT',
};

interface DAP {
  LOGOUT: {
    iconName: string;
    title: string;
    message: string;
  };
}

const DangerAlertProps: DAP = {
  LOGOUT: {
    //LOGOUT에 대한 속성들
    iconName: 'logout-variant',
    title: '로그아웃',
    message: '정말 로그아웃 하시겠습니까?',
  },
};

type Props = {
  visible: boolean;
  onClose: () => void;
  alertType: string;
  onConfirm: () => void;
};

const DangerAlert = ({ visible, onClose, alertType, onConfirm }: Props) => {
  const { iconName, title, message } = DangerAlertProps[alertType];
  return (
    <Modal
      visible={visible} // visible 속성 : 보였다, 안보였다
      transparent={true}
      animationType="fade" // fade : 서서히 나타났다 서서히 사라짐
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Pressable style={styles.background} onPress={onClose} />
        <View style={styles.alert}>
          <View style={styles.imageBackground}>
            <View style={styles.image}>
              <MaterialCommunityIcons name={iconName} size={30} color={WHITE} />
            </View>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{message}</Text>

          {/* 확인/취소버튼 */}
          <View style={styles.buttonContainer}>
            <Button
              title="취소"
              onPress={onClose}
              styles={buttonStyles}
              buttonType={ButtonTypes.CANCEL}
            />
            <Button
              title="확인"
              onPress={onConfirm}
              styles={buttonStyles}
              buttonType={ButtonTypes.DANGER}
            />
          </View>
        </View>
      </View>
    </Modal> // Modal창
  );
};

DangerAlert.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  alertType: PropTypes.oneOf(Object.values(AlertTypes)),
  onConfirm: PropTypes.func.isRequired,
};

const buttonStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10, // 외부영역, 버튼간의 간격 띄움
    marginTop: 10,
  },
  button: {
    borderRadius: 8,
  },
});

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFill, // position absolute, 전체방향 꽉 차게 창을 만들어줌
    backgroundColor: BLACK,
    opacity: 0.3,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    backgroundColor: WHITE,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 20,
    width: '80%',
    borderRadius: 8,
  },
  imageBackground: {
    // alert창 바깥쪽으로 튀어나가게 만들거임
    position: 'absolute', // position 겹쳐지는 absolute
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: WHITE,
    top: -40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: DANGER.DEFAULT, // 테두리가 생긴것처럼 보일수 있음
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 50, //위쪽이 absolute가 잡혔기때문에 위쪽여백을 많이 줌
    fontSize: 20,
    fontWeight: '700',
  },
  desc: {
    marginVertical: 10,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row', // 내부에 있는 개체들이 가로정렬
  },
});

export default DangerAlert;

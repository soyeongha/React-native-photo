import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  updateProfile,
} from 'firebase/auth';

const PHOTO_URL = '.../o/panda.png?alt=media';

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { user } = await signInWithEmailAndPassword(getAuth(), email, password);
  return user;
};

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { user } = await createUserWithEmailAndPassword(
    getAuth(),
    email,
    password
  );

  //이메일주소에서 0부터 최대10개까지의 숫자를 (아이디를) 추출하는내용
  await updateUserInfo({
    displayName: email.split('@')[0].slice(0, 10),
    PhotoURL: PHOTO_URL,
  });

  return user;
};

export const signOut = async () => {
  return await signOutFirebase(getAuth());
};

export const updateUserInfo = async (userInfo: object) => {
  try {
    await updateProfile(getAuth(), currentUser, userInfo);
  } catch (e) {
    throw new Error('사용자 정보 수정에 실패했습니다.');
  }
};

//에러메세지 출력
export const getAuthErrorMessages = (errorCode: string): string => {
  switch (errorCode) {
    case AuthErrorCodes.USER_DELETED:
      return '계정을 찾을 수 없습니다.';
    case AuthErrorCodes.INVALID_EMAIL:
      return '유효하지 않은 이메일 주소입니다..';
    case AuthErrorCodes.INVALID_PASSWORD:
      return '잘못된 비밀번호입니다.';
    case AuthErrorCodes.EMAIL_EXISTS:
      return '이미 가입된 이메일입니다.';
    case AuthErrorCodes.WEAK_PASSWORD:
      return '비밀번호는 영문자포함 최소 6자리입니다';
    default:
      return '로그인에 실패했습니다.';
  }
};

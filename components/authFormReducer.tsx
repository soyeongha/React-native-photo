export const initAuthForm = {
  email: '',
  password: '',
  passwordConfirm: '',
  disabled: true,
  isLoading: false,
};

export const AuthFormTypes = {
  UPDATE_FORM: 'update_form',
  TOGGLE_LOADING: 'toggle_loading',
  RESET: 'reset',
};

export const authFormReducer = (state: any, action: any) => {
  switch (action.type) {
    case AuthFormTypes.UPDATE_FORM:
      return { ...state, ...action.payload };
    case AuthFormTypes.TOGGLE_LOADING:
      return { ...state, isLoading: !state.isLoading };
    case AuthFormTypes.RESET:
      return initAuthForm;
    default:
      return state; // 상태값 그대로 돌려줌
  }
};

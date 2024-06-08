export const InputEmailText = {
  type: "email",
  labelText: "이메일",
  withAsterisk: true,
  placeholderText: "이메일을 입력해 주세요",
  icon: false,
  button: false,
  apiIcon: false,
  errorMessage: "* 이메일 형식을 맞게 써주세요",
  regEx: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const InputPasswordText = {
  type: "password",
  labelText: "비밀번호",
  withAsterisk: true,
  placeholderText: "비밀번호를 입력해 주세요",
  icon: false,
  button: false,
  apiIcon: false,
  errorMessage:
    "* 비밀번호는 8자 이상, 영문, 숫자, 특수 기호를 포함해야 합니다",
  regEx: /^(?=.*\d)(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]ㅡ             ){8,16}$/,
};

export type SignCommonTextType = {
  type: string;
  labelText: string;
  withAsterisk: boolean;
  placeholderText: string;
  icon: boolean;
  button: boolean;
  apiIcon: boolean;
  errorMessage: string;
  regEx: RegExp;
};

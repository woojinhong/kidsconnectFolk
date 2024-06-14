export interface ParentStateType {
  userType: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birth: string;
  phoneNum: string;
  address: string;
  detailAddress: string;
}

export interface TherapistStateType {
  userType: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birth: string;
  phoneNum: string;
  gender: string;
  address: string;
  detailAddress: string;
  isFreelancer: string;
  region: string;
  detailRegion: string;
}

export interface Action {
  type: ActionType;
  payload: string;
}

type ActionType =
  | "SET_EMAIL"
  | "SET_PASSWORD"
  | "SET_FIRSTNAME"
  | "SET_LASTNAME"
  | "SET_BIRTH"
  | "SET_PHONENUM"
  | "SET_ADDRESS"
  | "SET_DETAILADDRESS"
  | "SET_ISFREELANCER"
  | "SET_USERTYPE"
  | `SET_${string}`;

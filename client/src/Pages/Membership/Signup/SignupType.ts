export interface ParentStateType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNum: string;
  address: string;
  addressDetail: string;
  postalCode: string;
}

export interface TherapistStateType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNum: string;
  gender: string;
  postalCode: string;
  address: string;
  addressDetail: string;
  centerName: string;
  status: string;
  freelancer: string;
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
  | "SET_POSTALCODE"
  | "SET_STATUS"
  | "SET_GENDER"
  | "SET_CENTERNAME"
  | `SET_${string}`;

export type ToastMessageTypes = {
  type: "success" | "failed";
  message: string;
};

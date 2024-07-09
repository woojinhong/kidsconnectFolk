import { ParentStateType, TherapistStateType, Action } from "./SignupType";

export const parentInitialState: ParentStateType = {
  email: "",
  password: "",
  lastName: "",
  firstName: "",
  dateOfBirth: "",
  phoneNum: "",
  address: "",
  addressDetail: "",
  postalCode: "",
};

export const therapistInitialState: TherapistStateType = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  phoneNum: "",
  gender: "",
  postalCode: "",
  address: "",
  addressDetail: "",
  freelancer: "",
  centerName: "",
  status: "",
};

export const parentReducer = (state: ParentStateType, action: Action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "SET_LASTNAME":
      return {
        ...state,
        lastName: action.payload,
      };
    case "SET_FIRSTNAME":
      return {
        ...state,
        firstName: action.payload,
      };
    case "SET_BIRTH":
      return {
        ...state,
        dateOfBirth: action.payload,
      };
    case "SET_PHONENUM":
      return {
        ...state,
        phoneNum: action.payload,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };
    case "SET_DETAILADDRESS":
      return {
        ...state,
        addressDetail: action.payload,
      };
    case "SET_POSTALCODE":
      return {
        ...state,
        postalCode: action.payload,
      };
    default:
      return state;
  }
};

export const therapistReducer = (state: TherapistStateType, action: Action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "SET_LASTNAME":
      return {
        ...state,
        lastName: action.payload,
      };
    case "SET_FIRSTNAME":
      return {
        ...state,
        firstName: action.payload,
      };
    case "SET_BIRTH":
      return {
        ...state,
        dateOfBirth: action.payload,
      };
    case "SET_PHONENUM":
      return {
        ...state,
        phoneNum: action.payload,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };
    case "SET_DETAILADDRESS":
      return {
        ...state,
        addressDetail: action.payload,
      };
    case "SET_ISFREELANCER":
      return {
        ...state,
        freelancer: action.payload,
      };
    case "SET_GENDER":
      return {
        ...state,
        gender: action.payload,
      };
    case "SET_POSTALCODE":
      return {
        ...state,
        postalCode: action.payload,
      };
    case "SET_CENTERNAME":
      return {
        ...state,
        centerName: action.payload,
      };
    case "SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

import { ParentStateType, TherapistStateType, Action } from "./SignupType";

export const parentInitialState: ParentStateType = {
  userType: "parents",
  email: "",
  password: "",
  lastName: "",
  firstName: "",
  birth: "",
  phoneNum: "",
  address: "",
  detailAddress: "",
};

export const therapistInitialState: TherapistStateType = {
  userType: "therapist",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  birth: "",
  gender: "",
  phoneNum: "",
  address: "",
  detailAddress: "",
  isFreelancer: "",
  region: "",
  detailRegion: "",
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
        birth: action.payload,
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
        detailAddress: action.payload,
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
        birth: action.payload,
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
        detailAddress: action.payload,
      };
    case "SET_ISFREELANCER":
      return {
        ...state,
        isFreelancer: action.payload,
      };
    case "SET_GENDER":
      return {
        ...state,
        gender: action.payload,
      };
    case "SET_REGION":
      return {
        ...state,
        region: action.payload,
      };
    case "SET_DETAILREGION":
      return {
        ...state,
        detailRegion: action.payload,
      };
    default:
      return state;
  }
};

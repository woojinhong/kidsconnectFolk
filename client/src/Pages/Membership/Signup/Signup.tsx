import { useState, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupParentsInput from "../../../Component/Membership/SignUp/SignupParentsInput";
import SignupTherapistInput from "../../../Component/Membership/SignUp/SignupTherapistInput";
import UserTypeCheckbox from "../../../Component/Membership/UserTypeCheckbox";
import FilledButton from "../../../Component/Common/Button/FilledButton";
import Toast from "../../../Component/Common/Toast/Toast";
import {
  parentInitialState,
  therapistInitialState,
  parentReducer,
  therapistReducer,
} from "./SignupUseReducer";
import {
  ParentStateType,
  TherapistStateType,
  ToastMessageTypes,
} from "./SignupType";
import { changeInputEvent } from "../../../Assets/CommonType/EventType";
import { usePostSignup } from "../../../Services/ApiHooks";

function Signup() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<ToastMessageTypes>(
    {} as ToastMessageTypes
  );
  const [selectedUserType, setSelectedUserType] = useState<string>("parents");
  const [parentState, parentsDispatch] = useReducer(
    parentReducer,
    parentInitialState
  );
  const [therapistState, therapistDispatch] = useReducer(
    therapistReducer,
    therapistInitialState
  );

  const isFormInvalid =
    selectedUserType === "parents"
      ? parentFormValidation(parentState)
      : therapistFormValidation(therapistState);

  const handleChangeReducer = (e: changeInputEvent) => {
    const { name, value } = e.target;
    if (selectedUserType === "parents") {
      parentsDispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
    } else if (selectedUserType === "therapist") {
      therapistDispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
    }
  };
  const handleDateChangeReducer = (inputValue: string) => {
    if (selectedUserType === "parents") {
      parentsDispatch({ type: `SET_BIRTH`, payload: inputValue });
    } else if (selectedUserType === "therapist") {
      therapistDispatch({ type: `SET_BIRTH`, payload: inputValue });
    }
  };
  const handlePostalCodeChangeReducer = (inputValue: string) => {
    if (selectedUserType === "parents") {
      parentsDispatch({ type: "SET_POSTALCODE", payload: inputValue });
    } else if (selectedUserType === "therapist") {
      therapistDispatch({ type: "SET_POSTALCODE", payload: inputValue });
    }
  };
  const handleClickReducer = (category: string, inputValue: string) => {
    if (category === "address") {
      parentsDispatch({ type: "SET_ADDRESS", payload: inputValue });
    } else if (category === "address") {
      therapistDispatch({ type: "SET_ADDRESS", payload: inputValue });
    }
  };
  const handleIsFreelancer = (e: changeInputEvent) => {
    const { checked } = e.target;
    const checkedString = checked ? "true" : "false";
    therapistDispatch({ type: "SET_ISFREELANCER", payload: checkedString });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedUserType === "parents") {
      usePostSignup(parentState, undefined, setToastMessage, navigate);
    } else {
      usePostSignup(undefined, therapistState, setToastMessage, navigate);
    }
  };

  return (
    <div>
      {toastMessage.type === "success" && (
        <Toast variant={toastMessage.type} title={toastMessage.message} />
      )}
      <div>
        <h2>📝 회원가입</h2>
        <span>
          이미 가입한 회원이신가요? <Link to="/login">로그인 하기</Link>
        </span>
      </div>
      <section>
        <div>
          <h3>회원 유형</h3>
          <span>회원가입 유형을 선택 후 가입해 주세요</span>
          <form onSubmit={handleFormSubmit}>
            <UserTypeCheckbox onClick={setSelectedUserType} />
            {selectedUserType === "parents" ? (
              <SignupParentsInput
                handleChangeReducer={handleChangeReducer}
                handleClickReducer={handleClickReducer}
                handleDateChangeReducer={handleDateChangeReducer}
                handleInputChangeReducer={handlePostalCodeChangeReducer}
              />
            ) : (
              <SignupTherapistInput
                handleChangeReducer={handleChangeReducer}
                handleClickReducer={handleClickReducer}
                handleDateChangeReducer={handleDateChangeReducer}
                handleInputChangeReducer={handlePostalCodeChangeReducer}
                handleIsFreelancer={handleIsFreelancer}
              />
            )}
            <FilledButton
              submit={true}
              text="회원가입"
              disabled={isFormInvalid}
            />
            {toastMessage.type === "failed" && (
              <span>{toastMessage.message}</span>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default Signup;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const phoneRegex = /^\d{10,11}$/;

const validateCommonFields = (data: {
  email: string;
  password: string;
  phoneNum: string;
}) => {
  const isEmailValid = emailRegex.test(data.email);
  const isPhoneNumValid = phoneRegex.test(data.phoneNum);
  const isPasswordValid = passwordRegex.test(data.password);

  return (
    data.email &&
    data.password &&
    data.phoneNum &&
    isEmailValid &&
    isPhoneNumValid &&
    isPasswordValid
  );
};

const therapistFormValidation = (data: TherapistStateType): boolean => {
  const isCommonValid = validateCommonFields(data);

  return !(
    isCommonValid &&
    data.lastName &&
    data.firstName &&
    data.dateOfBirth
  );
};

const parentFormValidation = (data: ParentStateType): boolean => {
  const isCommonValid = validateCommonFields(data);

  return !(
    isCommonValid &&
    data.lastName &&
    data.firstName &&
    data.dateOfBirth &&
    data.address
  );
};

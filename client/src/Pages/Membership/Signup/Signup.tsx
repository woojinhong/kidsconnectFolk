import { useState, useReducer } from "react";
import { Link } from "react-router-dom";

import SignupParentsInput from "../../../Component/Membership/SignUp/SignupParentsInput";
import SignupTherapistInput from "../../../Component/Membership/SignUp/SignupTherapistInput";
import UserTypeCheckbox from "../../../Component/Membership/UserTypeCheckbox";
import FilledButton from "../../../Component/Common/Button/FilledButton";
import {
  parentInitialState,
  therapistInitialState,
  parentReducer,
  therapistReducer,
} from "./SignupUseReducer";
import { ParentStateType, TherapistStateType } from "./SignupType";
import { changeInputEvent } from "../../../Assets/CommonType/EventType";

function Signup() {
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
  const handleClickReducer = (category: string, inputValue: string) => {
    if (category === "region") {
      therapistDispatch({ type: "SET_REGION", payload: inputValue });
    } else if (category === "detailRegion") {
      therapistDispatch({ type: "SET_DETAILREGION", payload: inputValue });
    } else if (category === "address") {
      parentsDispatch({ type: "SET_ADDRESS", payload: inputValue });
    } else if (category === "centerName") {
      therapistDispatch({ type: "SET_ADDRESS", payload: inputValue });
    }
  };
  const handleBooleanChangeReducer = (
    category: string,
    inputValue: boolean
  ) => {
    if (category === "isFreelancer") {
      const inputValueToString = inputValue ? "true" : "false";
      therapistDispatch({
        type: "SET_ISFREELANCER",
        payload: inputValueToString,
      });
    }
  };

  return (
    <main>
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
          <form>
            <UserTypeCheckbox onClick={setSelectedUserType} />
            {selectedUserType === "parents" ? (
              <SignupParentsInput
                handleChangeReducer={handleChangeReducer}
                handleClickReducer={handleClickReducer}
                handleDateChangeReducer={handleDateChangeReducer}
              />
            ) : (
              <SignupTherapistInput
                handleChangeReducer={handleChangeReducer}
                handleClickReducer={handleClickReducer}
                handleDateChangeReducer={handleDateChangeReducer}
                handleBooleanChangeReducer={handleBooleanChangeReducer}
              />
            )}
            <FilledButton text="회원가입" disabled={isFormInvalid} />
          </form>
        </div>
      </section>
    </main>
  );
}

export default Signup;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10,11}$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

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

  const isFreelancerValid =
    data.isFreelancer === "true"
      ? data.region && data.detailRegion
      : data.address;

  return !(
    isCommonValid &&
    data.lastName &&
    data.firstName &&
    data.birth &&
    isFreelancerValid
  );
};

const parentFormValidation = (data: ParentStateType): boolean => {
  const isCommonValid = validateCommonFields(data);

  return !(
    isCommonValid &&
    data.lastName &&
    data.firstName &&
    data.birth &&
    data.address
  );
};

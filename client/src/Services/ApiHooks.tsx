import { axiosApp } from "./axiosApp";
import { NavigateFunction } from "react-router-dom";
import {
  ParentStateType,
  TherapistStateType,
  ToastMessageTypes,
} from "../Pages/Membership/Signup/SignupType";
import { useDelayChatbox } from "./CustomHooks";

export const usePostSignin = async (
  userData: ParentStateType | undefined,
  therapistData: TherapistStateType | undefined,
  setToastMessage: React.Dispatch<React.SetStateAction<ToastMessageTypes>>,
  navigate: NavigateFunction
) => {
  const data = userData
    ? userData
    : therapistData
      ? {
          ...therapistData,
          freelancer: therapistData.freelancer === "true",
          gender: therapistData.gender === "여성" ? "F" : "M",
        }
      : undefined;
  const path = userData ? "user" : "therapist";

  try {
    const res = await axiosApp.post(
      `/auth/signup/${path}`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setToastMessage({
      type: "success",
      message: "회원가입이 완료되었습니다. 로그인해주세요.",
    });
    await useDelayChatbox(1500);
    navigate("/login");
  } catch (err: any) {
    setToastMessage({
      type: "failed",
      message: err.response.data.message,
    });
  }
};

import { axiosApp } from "./axiosApp";
import { NavigateFunction } from "react-router-dom";
import {
  ParentStateType,
  TherapistStateType,
  ToastMessageTypes,
} from "../Pages/Membership/Signup/SignupType";
import { useDelayChatbox } from "./CustomHooks";
import { CookieSetOptions } from "universal-cookie";

// 회원가입 POST API
export const usePostSignup = async (
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
    await axiosApp.post(`/auth/signup/${path}`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
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

// 로그인 POST API
export const usePostSignin = async (
  userType: string,
  postData: { email: string; password: string },
  setToastMessage: React.Dispatch<React.SetStateAction<ToastMessageTypes>>,
  navigate: NavigateFunction,
  useNavigation: "PUSH" | "REPLACE" | "POP",
  setCookie: (
    name: "token",
    value: any,
    options?: CookieSetOptions | undefined
  ) => void
) => {
  const path = userType === "parents" ? "user" : "therapist";

  try {
    const res = await axiosApp.post(
      `/auth/login/${path}`,
      JSON.stringify(postData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setCookie("token", res.data.token);
    axiosApp.defaults.headers.common["Authorization"] =
      `Bearer ${res.data.token}`;
    await useDelayChatbox(1500);
    setToastMessage({
      type: "success",
      message: "로그인에 성공하였습니다",
    });
    // if (useNavigation === "PUSH") {
    //   navigate(-1);
    // }
  } catch (err: any) {
    setToastMessage({
      type: "failed",
      message: "아이디와 비밀번호를 확인해 주세요",
    });
  }
};

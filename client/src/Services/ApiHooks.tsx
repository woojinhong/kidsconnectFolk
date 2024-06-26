import { axiosApp } from "./axiosApp";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import { GatheredChildDataType } from "../Component/Common/Modal/ModalContent/ModalContentType";
import {
  ParentStateType,
  TherapistStateType,
  ToastMessageTypes,
} from "../Pages/Membership/Signup/SignupType";
import { useDelayChatbox } from "./CustomHooks";
import { loginStatusActions } from "../Store/Slices/LoginStatus";

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
export const usePostSignin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);

  const postSignin = async (
    userType: string,
    postData: { email: string; password: string },
    setToastMessage: React.Dispatch<React.SetStateAction<ToastMessageTypes>>
  ) => {
    const path = userType === "parents" ? "user" : "therapist";
    const loginStatusData = { userType, isLogin: true };

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
      console.log(res);
      setCookie("token", res.headers["authorization"]);
      axiosApp.defaults.headers.common["Authorization"] =
        `Bearer ${res.headers["authorization"]}`;
      dispatch(loginStatusActions.setLoginStatus(loginStatusData));
      await useDelayChatbox(800);
      navigate("/");
    } catch (err: any) {
      setToastMessage({
        type: "failed",
        message: "아이디와 비밀번호를 확인해 주세요",
      });
    }
  };

  return { postSignin };
};

// 아이 등록 POST API
export const usePostChild = async (data: GatheredChildDataType) => {
  try {
    const cookie = document.cookie.replace("Bearer%", "");
    await axiosApp.post("/child/register", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookie.split("=")[1]}`,
      },
    });
  } catch (err: any) {
    console.error(err);
  }
};

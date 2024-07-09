import { useState } from "react";
import { axiosApp } from "./axiosApp";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import { gatheredIntroductionDataType } from "../Pages/CreateIntroduction/CreateIntroductionType";
import { GatheredChildDataType } from "../Component/Common/Modal/ModalContent/ModalContentType";
import {
  ParentStateType,
  TherapistStateType,
  ToastMessageTypes,
} from "../Pages/Membership/Signup/SignupType";
import { useDelayChatbox } from "./CustomHooks";
import { loginStatusActions } from "../Store/Slices/LoginStatus";
import { AppliedOptionDataType } from "../Component/Common/Modal/ModalContent/ApplicationQuestionary";

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

// 로그인한 부모님 정보 GET API
export const useGetParentInfo = () => {
  const [cookie] = useCookies(["token"]);

  const getParentInfo = async () => {
    try {
      const res = await axiosApp.get("/user", {
        headers: {
          Authorization: cookie.token,
        },
      });
      return res.data;
    } catch (err: any) {
      console.error(err);
    }
  };

  return { getParentInfo };
};

// 로그인한 부모님의 아이 정보 GET API
export const useGetParentChildInfo = () => {
  const [cookie] = useCookies(["token"]);

  const getParentChildInfo = async () => {
    try {
      const res = await axiosApp.get("/child", {
        headers: {
          Authorization: cookie.token,
        },
      });
      return res.data;
    } catch (err: any) {
      console.error(err);
    }
  };
  return { getParentChildInfo };
};

// 로그인한 therapist 정보 GET API
export const useGetTherapistInfo = () => {
  const [cookie] = useCookies(["token"]);

  const getTherapistInfo = async () => {
    try {
      const res = await axiosApp.get("/therapist", {
        headers: {
          Authorization: cookie.token,
        },
      });
      return res.data;
    } catch (err: any) {
      console.error(err);
    }
  };

  return { getTherapistInfo };
};

// 치료사 portfolio POST API
export const usePostTherapistPortfolio = () => {
  const [cookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const postTherapistPortfolio = async (
    data: gatheredIntroductionDataType,
    setToastMessage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const cleanedExperience = data.experience.map(({ startDate, endDate }) => ({
      startDate: new Date(startDate).toISOString().split("T")[0],
      endDate: new Date(endDate).toISOString().split("T")[0],
    }));

    const cleanedEducation = data.education.map(({ education, degree }) => ({
      education,
      degree,
    }));

    const cleanedData = {
      ...data,
      experience: cleanedExperience,
      education: cleanedEducation,
    };

    try {
      await axiosApp.post("/therapist/info", JSON.stringify(cleanedData), {
        headers: {
          "Content-Type": "application/json",
          Authorization: cookie.token,
        },
      });
      setToastMessage("자기소개서가 등록되었습니다");
      navigate("/mypage/t");
    } catch (err: any) {
      setToastMessage(err.response.data.message);
    }
  };

  return { postTherapistPortfolio };
};

// 아이 정보 GET API
export const useGetChildInfo = () => {
  const [cookie] = useCookies(["token"]);

  const getChildInfo = async () => {
    try {
      const res = await axiosApp.get("/child", {
        headers: {
          Authorization: cookie.token,
        },
      });
      return res.data;
    } catch (err: any) {
      console.error(err);
    }
  };

  return { getChildInfo };
};
// 매칭 신청 서베이 POST API
export const usePostMatchingSurvey = () => {
  const [cookie] = useCookies(["token"]);

  const postMatchingSurvey = async (data: AppliedOptionDataType) => {
    const location = {
      location: data.location,
    };
    try {
      await axiosApp.post(
        `/reservation/child/${data.childId}/therapist/${data.therapistId}`,
        JSON.stringify(location),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: cookie.token,
          },
        }
      );
    } catch (err: any) {
      console.error(err);
    }
  };
  return { postMatchingSurvey };
};

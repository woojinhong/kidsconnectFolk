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
import { PreferenceSurveyState } from "../Store/Slices/MatchingSurveySlice";
import { ReviewDataType } from "../Component/Common/Modal/ModalContent/ModalContentType";

// 회원가입 POST API
export const usePostSignup = () => {
  const navigate = useNavigate();
  const postSignup = async (
    userData: ParentStateType | undefined,
    therapistData: TherapistStateType | undefined,
    setToastMessage: React.Dispatch<React.SetStateAction<ToastMessageTypes>>
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
  return { postSignup };
};

// 로그인 POST API
export const usePostSignin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);

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
export const usePostChild = () => {
  const [cookie] = useCookies(["token"]);

  const postChild = async (data: GatheredChildDataType) => {
    try {
      await axiosApp.post("/child/register", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: cookie.token,
        },
      });
    } catch (err: any) {
      console.error(err);
    }
  };
  return { postChild };
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

//전체 therapist 정보 가져오는 API
export const useGetAllTherapist = () => {
  const [cookie] = useCookies(["token"]);

  const getAllTherapist = async () => {
    try {
      const res = await axiosApp.get("/therapist/showAll", {
        headers: {
          Authorization: cookie.token,
        },
      });
      return res.data;
    } catch (err: any) {
      console.error(err);
    }
  };
  return { getAllTherapist };
};

// id값에 따라 therapist 정보 가져오는 API
export const useGetTherapistById = () => {
  const [cookie] = useCookies(["token"]);

  const getTherapistById = async (id: number) => {
    try {
      const res = await axiosApp.get(`/therapist/${id}`, {
        headers: {
          Authorization: cookie.token,
        },
      });
      return res.data;
    } catch (err: any) {
      console.error(err);
    }
  };
  return { getTherapistById };
};

export const useGetTherapistInfoById = () => {
  const [cookie] = useCookies(["token"]);

  const getTherapistInfoById = async (id: number) => {
    try {
      const res = await axiosApp.get(`/therapist/info/therapist/${id}`, {
        headers: {
          Authorization: cookie.token,
        },
      });
      return res.data;
    } catch (err: any) {
      console.error(err);
    }
  };
  return { getTherapistInfoById };
};

//therapist를 필터링해서 가져오는 API
export const useGetFilteredTherapist = () => {
  const [cookie] = useCookies(["token"]);

  const getFilteredTherapist = async (
    preferenceData: PreferenceSurveyState,
    region: string
  ) => {
    try {
      const params = {
        address: region ? (region === "전체" ? "" : region) : "",
        isExperience: "",
        gender: switchGenderToEng(preferenceData.preference.gender) || "",
        symptoms: preferenceData.treatmentArea
          ? preferenceData.treatmentArea.includes("전체")
            ? ""
            : preferenceData.treatmentArea.join(",")
          : "",
        sort: "rating",
      };

      const res = await axiosApp.get("/search/filter", {
        params: params,
        headers: {
          Authorization: cookie.token,
        },
      });
      return res.data;
    } catch (err: any) {
      console.error(err);
    }
  };
  return { getFilteredTherapist };
};

// Top 4명 치료사 Id get하는 api
export const useGetTopTherapist = async () => {
  try {
    const res = await axiosApp.get("/search/top-therapists");
    return res.data;
  } catch (err: any) {
    console.error(err);
  }
};

// reviewData POST API
export const usePostReview = () => {
  const [cookie] = useCookies(["token"]);

  const postReview = async (data: ReviewDataType, id: number) => {
    try {
      await axiosApp.post(`/review/${id}`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: cookie.token,
        },
      });
    } catch (err: any) {
      console.error(err);
    }
  };
  return { postReview };
};

const switchGenderToEng = (value: string | undefined) => {
  switch (value) {
    case "여성":
      return "F";
    case "남성":
      return "M";
    default:
      return "";
  }
};

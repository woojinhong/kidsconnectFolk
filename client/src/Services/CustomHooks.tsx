import TherapistPreference from "../Component/Common/Modal/ModalContent/TherapistPreference";
import AddChildSurvey from "../Component/Common/Modal/ModalContent/AddChildSurvey";
import ApplicationQuestionary from "../Component/Common/Modal/ModalContent/ApplicationQuestionary";

// 경력 년,월 시작일, 끝난일을 통해 계산 커스텀 훅
export function useCareerDateCalc(startDate: string, endDate: string) {
  const careerDateYear =
    new Date(endDate).getFullYear() - new Date(startDate).getFullYear();
  const careerDateMonth =
    new Date(endDate).getMonth() - new Date(startDate).getMonth();
  if (careerDateYear < 0 && careerDateMonth < 0) {
    return undefined;
  } else if (careerDateMonth > 12) {
    return `${careerDateYear + 1}년 ${careerDateMonth - 12}개월`;
  } else if (careerDateYear < 0 && careerDateMonth > 0) {
    return `${careerDateMonth}개월`;
  } else if (careerDateYear > 0 && careerDateMonth <= 0) {
    return `${careerDateYear}년`;
  } else {
    return `${careerDateYear}년 ${careerDateMonth}개월`;
  }
}

// 아이 나이 태어난 날짜를 통해 계산 커스텀 훅
export function useGetChildAge(dateOfBirth: string) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// chatbox 시간 지연 커스텀 훅
export function useDelayChatbox(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//Category Value 가져오는 Custom Hook
export const getSelectedTreatmentArea = (
  text: string,
  state: string[],
  setState: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (state.includes(text)) {
    setState(state.filter((area) => area !== text));
  } else if (text === "전체") {
    setState([text]);
  } else if (state.includes("전체")) {
    setState([text]);
  } else {
    setState([...state, text]);
  }
};

export const useGetContentInModal = (
  type: "therapistPreference" | "addChild" | "apply"
) => {
  switch (type) {
    case "therapistPreference":
      return <TherapistPreference />;
    case "addChild":
      return <AddChildSurvey />;
    case "apply":
      return <ApplicationQuestionary />;
    default:
      return null;
  }
};

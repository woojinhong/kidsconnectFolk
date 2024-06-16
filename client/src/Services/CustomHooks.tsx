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
  } else if (text === "전체" || "진단 필요") {
    setState([text]);
  } else if (state.includes("전체" || "진단 필요")) {
    setState([text]);
  } else {
    setState([...state, text]);
  }
};

export const useErrorMessagesAccordingToInputLabel = (label: string) => {
  switch (label) {
    case "생년월일":
      return "생년월일을 입력해주세요";
    case "휴대폰 번호":
      return "휴대폰 번호를 입력해주세요";
    default:
      return "";
  }
};

import { experienceType } from "../Component/Common/Card/TherapistCard/TherapistCardType";

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
  setState: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setState((state) => {
    if (state.includes(text)) {
      return state.filter((area) => area !== text);
    } else if (text === "진단 필요" || text === "전체") {
      return [text];
    } else if (state.includes("진단 필요") || state.includes("전체")) {
      return [text];
    } else {
      return [...state, text];
    }
  });
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

//Symptom text에 맞게 emoji를 렌더해주는 Custom Hook
export const useSymptomMatchEmoji = (tag: string) => {
  switch (tag) {
    case "언어발달":
      return "💬";
    case "인지발달":
      return "🧩";
    case "행동발달":
      return "👟";
    case "심리재활":
      return "❤️‍🩹";
    case "특수교육":
      return "📚";
    case "창의재활":
      return "🎨";
    default:
      return "🤔";
  }
};

//AgeRange text에 맞게 description 렌더해주는 Custom Hook
export const useDescriptionMatchAgeRange = (text: string) => {
  switch (text) {
    case "유아":
      return "1세~2세";
    case "영아":
      return "3세~6세";
    case "초등저학년":
      return "7세~10세";
    case "초등고학년":
      return "11세~13세";
    default:
      return "1세~2세";
  }
};

//experience에서 years, months를 합하여 총 경력을 만드는 Custom Hook
export const useAmountExperience = (data: experienceType[]) => {
  let totalYears = 0;
  let totalMonths = 0;
  data.forEach((element) => {
    totalYears += element.years;
    totalMonths += element.months;

    if (totalMonths >= 12) {
      totalYears++;
      totalMonths -= 12;
    }
  });

  return `${totalYears}년 ${totalMonths}개월`;
};

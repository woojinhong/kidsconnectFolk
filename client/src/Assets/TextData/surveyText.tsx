import LoadingAnimation from "../Animation/Loading.gif";

const surveyText = [
  {
    type: "preference",
    messages: {
      intro:
        "안녕하세요! 아이에게 맞는 선생님 매칭을 위해 몇 가지 질문을 드릴게요!",
      gender: "선호하는 선생님 성별이 있나요?",
      career: "경력이 있으신 선생님을 찾나요?",
      loading: "선생님을 찾고 있어요!",
    },
    selectGender: ["남성", "여성", "상관 없어요!"],
    selectCareer: ["네", "상관 없어요!"],
    loadingLottie: LoadingAnimation,
  },
  {
    type: "application",
    messages: {
      childSelect: "어떤 아이가 도움이 필요한가요?",
      careLocation: "어디서 도움을 받고 싶으신가요?",
      done: "신청이 완료되었어요!",
    },
    selectChild: ["민주", "+ 아이 등록하기"],
    selectLocation: [
      "선생님이 근무하는 곳으로 갈게요!",
      "집에서 받고 싶어요!",
      "문의 후 조율할게요",
    ],
    selectParams: [
      "선생님들을 더 찾아보고 싶어요",
      "마이페이지에서 확인할게요",
    ],
    toMypage: "/mypage/p",
    toHistory: "/matching",
  },
  {
    type: "addChild",
    messages: {
      name: "아이 이름이 뭔가요?",
      gender: "아이의 성별을 알려주세요",
      birthDate: "아이의 생년월일을 알려 주세요",
      treatmentNeeded: "아이가 필요한 치료를 알려 주세요",
      characteristic: "아이의 성격 또는 성향을 간단하게 입력해주세요",
    },
    placeholder: "날짜 선택하기",
    selectGender: ["남아", "여아"],
  },
  {
    type: "review",
    messages: {
      rating: "선생님에게 리뷰를 남겨주세요.",
      comment:
        "상세한 후기를 남겨주세요. 후기는 모든 회원과 선생님이 볼 수 있어요.",
      done: "후기가 등록되었어요!",
    },
  },
];

export default surveyText;

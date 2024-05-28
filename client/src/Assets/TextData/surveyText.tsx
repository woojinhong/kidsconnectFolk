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
    selectChild: ["+ 아이 등록하기"],
    selectLocation: [
      "선생님이 근무하는 곳으로 갈게요!",
      "집에서 받고 싶어요!",
      "문의 후 조율할게요",
    ],
    selectParams: ["선생님들을 더 찾아보고 싶어요", "홈 화면으로 돌아갈게요"],
    toHome: "/",
    toHistory: "/history",
  },
  {
    type: "addChild",
    message: {
      name: "아이 이름이 뭔가요?",
      birthDate: "아이의 생년월일을 알려주세요",
      characteristic: "아이의 성격 또는 성향을 간단하게 입력해주세요",
    },
    placeholder: "날짜 선택하기",
  },
];

export default surveyText;

const selectboxData = [
  {
    type: "region",
    placeholder: "프로필 노출 지역",
    data: ["서울", "경기", "인천"],
  },
  {
    type: "detailedRegion",
    placeholder: "상세 지역",
    detailedRegion: {
      seoul: [
        "강남구",
        "강동구",
        "강북구",
        "강서구",
        "관악구",
        "광진구",
        "구로구",
        "금천구",
        "노원구",
        "도봉구",
        "동대문구",
        "동작구",
        "마포구",
        "서대문구",
        "서초구",
        "성동구",
        "성북구",
        "송파구",
        "양천구",
        "영등포구",
        "용산구",
        "은평구",
        "종로구",
        "중구",
        "중랑구",
      ],
      incheon: [
        "강화군",
        "계양구",
        "남동구",
        "동구",
        "미추홀구",
        "부평구",
        "서구",
        "연수구",
        "옹진군",
      ],
      gyeonggi: [
        "고양시",
        "과천시",
        "광명시",
        "군포시",
        "김포시",
        "남양주시",
        "부천시",
        "성남시",
        "안양시",
        "오산시",
        "용인시",
        "평택시",
        "하남시",
      ],
    },
  },
  {
    type: "degree",
    placeholder: "학위",
    data: ["학사", "석사", "박사"],
  },
  {
    type: "degreeCompletion",
    placeholder: "수료 상태",
    data: ["졸업", "재학", "휴학", "수료"],
  },
  {
    type: "career",
    placeholder: "경력 무관",
    data: ["경력 무관", "경력"],
  },
  {
    type: "gender",
    placeholder: "성별",
    data: ["성별 무관", "남성", "여성"],
  },
  {
    type: "filterBy",
    placeholder: "최신순",
    data: ["최신순", "인기순"],
  },
  {
    type: "userRegion",
    placeholder: "지역",
    data: ["전체", "서울", "경기", "인천"],
  },
];

export default selectboxData;

export type categoryDefaultType = {
  type: string;
  placeholder: string;
  data?: string[];
  detailedRegion?: detailedRegionType;
};

export type detailedRegionType = {
  [key: string]: string[];
  seoul: string[];
  incheon: string[];
  gyeonggi: string[];
};

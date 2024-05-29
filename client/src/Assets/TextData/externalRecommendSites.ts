import BgImg1 from "../../Assets/Image/ExternalSites/Rectangle1.png";
import BgImg2 from "../../Assets/Image/ExternalSites/Rectangle2.png";
import BgImg3 from "../../Assets/Image/ExternalSites/Rectangle3.png";
import BgImg4 from "../../Assets/Image/ExternalSites/Rectangle4.png";

import Logo1 from "../../Assets/Image/ExternalSites/SeoulCenterCi.png";
import Logo2 from "../../Assets/Image/ExternalSites/KCDI.png";
import Logo3 from "../../Assets/Image/ExternalSites/DEP.png";
import Logo4 from "../../Assets/Image/ExternalSites/KCELF.png";

const externalRecommendSites = [
  {
    logo: Logo1,
    alt: "서울시 아동발달지원센터",
    text: "온라인 발달 검사 바로가기",
    backgroundImage: BgImg1,
    link: "https://www.seoul-i.kr/online/online_intro",
  },
  {
    logo: Logo2,
    alt: "K-CDI",
    ageRange: "15개월 ~ 만 6세 5개월 아동",
    text: "아동 발달 검사 구매하기",
    backgroundImage: BgImg2,
    link: "https://inpsyt.co.kr/psy/item/view/KCDI_CO_TG",
  },
  {
    logo: Logo3,
    alt: "DEP",
    ageRange: "영유아",
    text: "영아선별 발달 검사 구매하기",
    backgroundImage: BgImg3,
    link: "https://tespia.kr/tp_mall/prd_detail.asp?num=47",
  },
  {
    logo: Logo4,
    alt: "KCELF",
    ageRange: "초등 1년생 ~ 대학생",
    text: "한국판 핵심언어 임상평가 구매하기",
    backgroundImage: BgImg4,
    link: "https://isorimall.com/catalog/ProdDetail.asp?cate1=1000&cate2=1012&pid=bca0251&page=1&pagenum=40",
  },
];
export default externalRecommendSites;

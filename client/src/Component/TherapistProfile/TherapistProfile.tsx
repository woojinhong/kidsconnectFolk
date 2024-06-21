import Category from "../Common/Category/Category";
import ConfirmDocLabel from "../Common/Label/ConfirmDocLabel/ConfirmDocLabel";
import CheckBoxAgeBox from "../Common/CheckBox/CheckBoxAge/CheckBoxAgeBox";

import { ProfileDetailType } from "../Mypage/TherapistContent/Profile/ProfileType";
import treatmentAreaText from "../../Assets/TextData/treatmentAreaText";

function TherapistProfile({ data }: { data?: object }) {
  const { title, bio, content, education, identityCheck, crimeCheck } =
    data as ProfileDetailType;

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <div>
          <h4>자기 소개</h4>
          <p>{bio}</p>
        </div>
        <div>
          <h4>
            <span>도울 수 있는</span> 치료/교육/재활 영역
          </h4>
          {/* 나중에 treatmentArea 가져오기 */}
          {treatmentAreaText &&
            treatmentAreaText.map((category) => (
              <Category
                key={category.text}
                emoji={category.emoji}
                text={category.text}
                size="lg"
              />
            ))}
        </div>
        <div>
          <h4>
            <span>도울 수 있는</span> 아이 연령
          </h4>
          {/* 나중에 checkboxAge 가져오기 */}
          <CheckBoxAgeBox
            label="유아"
            description="0세 ~ 7세"
            checkedData={["유아"]}
          />
        </div>
        <div>
          <h4>경력</h4>
          <div>총 몇년 몇개월</div>
          <ul>
            <li>경력</li>
          </ul>
        </div>
        <div>
          <h4>학력</h4>
          <p>{education}</p>
        </div>
        <div>
          <h4>자격증</h4>
          <ul>
            <li>인사자격증 4급</li>
          </ul>
        </div>
        <div>
          <h4>상세 소개</h4>
          <p>{content}</p>
        </div>
        <div>
          <h4>기타 인증</h4>
          {identityCheck ? <ConfirmDocLabel type="id" /> : null}
          {/* Todo: crimeCheck ConfirmDocLabel 제작하기 */}
          {crimeCheck ? <ConfirmDocLabel type="career" /> : null}
        </div>
      </div>
    </div>
  );
}

export default TherapistProfile;

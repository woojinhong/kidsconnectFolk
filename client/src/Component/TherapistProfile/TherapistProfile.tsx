import CheckBoxAgeList from "../Common/CheckBox/CheckBoxAge/CheckBoxAgeList";
import ConfirmDocLabel from "../Common/Label/ConfirmDocLabel/ConfirmDocLabel";

import { ProfileDetailType } from "../Mypage/TherapistContent/Profile/ProfileType";

function TherapistProfile({ data }: { data?: object }) {
  const {
    title,
    bio,
    content,
    education,
    identityCheck,
    crimeCheck,
    ageRange,
    treatmentArea,
  } = data as ProfileDetailType;

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
          <ul>
            {treatmentArea.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>
            <span>도울 수 있는</span> 아이 연령
          </h4>
          <ul>
            <CheckBoxAgeList treatmentData={ageRange} checked={true} />
          </ul>
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

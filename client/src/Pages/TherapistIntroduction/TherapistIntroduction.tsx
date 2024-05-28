import Tag from "../../Component/Common/Tag/Tag";
import TherapistProfile from "../../Component/TherapistProfile/TherapistProfile";

import TherapistInfoData from "../../MockData/therapistInfoData.json";
import TherapistData from "../../MockData/therapistData.json";
import TherapistCareer from "../../MockData/therapistExperienceData.json";

import { ProfileType } from "../../Component/Mypage/TherapistContent/Profile/ProfileType";
import {
  ProfileDetailType,
  ProfileCareerType,
} from "../../Component/Mypage/TherapistContent/Profile/ProfileType";

import IconReview from "../../Assets/Image/IconReview.svg";

function TherapistIntroduction() {
  // 나중에 therapist Id params로 받아오기
  const therapistId = 1;
  const therapistDataById: object | undefined = TherapistData.find(
    (data) => data.id === therapistId
  );
  const therapistInfoById: object | undefined = TherapistInfoData.find(
    (data) => data.id === therapistId
  );
  const therapistCareerById = TherapistCareer.find(
    (data) => data.therapistId === therapistId
  );

  const { firstName, lastName } = therapistDataById as ProfileType;
  const { imageFile, review, treatmentArea } =
    therapistInfoById as ProfileDetailType;
  const { place } = therapistCareerById as ProfileCareerType;

  return (
    <main>
      <section>
        <div>
          <img src={imageFile} alt="프로필 이미지" />
          <span></span>
        </div>
        <div>
          <div>
            {treatmentArea.map((text, index) => (
              <Tag key={index} value={text} />
            ))}
          </div>
          <div>
            <h4>
              <span>
                {firstName}
                {lastName}
              </span>
              선생님
            </h4>
          </div>
          <div>
            <div>
              <img src={IconReview} alt="리뷰 점수" />
              <span>{review}</span>
            </div>
            <div>
              경력 <span>8년 6개월</span>
            </div>
            <div>{place} 근무 중</div>
          </div>
          {/* Todo: Modal PR 머지되면 Modal Component로 변경 */}
          <button>연결해 주세요</button>
        </div>
      </section>
      <section>
        <TherapistProfile data={therapistInfoById} />
      </section>
    </main>
  );
}

export default TherapistIntroduction;

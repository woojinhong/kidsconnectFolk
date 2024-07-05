import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FilledButton from "../../../Common/Button/FilledButton";
import { useGetTherapistInfo } from "../../../../Services/ApiHooks";
import TherapistProfile from "../../../TherapistProfile/TherapistProfile";
import { ProfileType } from "./ProfileType";
import ProfileSummary from "./ProfileSummary";
import userDetailInfoById from "../../../../MockData/therapistInfoData.json";

import {
  StyledMain,
  StyledTherapistProfileContainer,
  StyledPortfolioContainer,
} from "../../../../Pages/Mypage/Mypage.style";

function ProfileContent() {
  const [therapistInfo, setTherapistInfo] = useState<ProfileType>(
    {} as ProfileType
  );
  const { getTherapistInfo } = useGetTherapistInfo();

  useEffect(() => {
    const fetchTherapistData = async () => {
      return setTherapistInfo(await getTherapistInfo());
    };
    fetchTherapistData();
  }, []);

  return (
    <section>
      <StyledMain>
        <StyledTherapistProfileContainer className="therapist_profile">
          <h3>내 프로필</h3>
          <div>
            <ProfileSummary therapistInfo={therapistInfo} />
          </div>
        </StyledTherapistProfileContainer>
        <div>
          <h3>자기 소개</h3>
          <StyledPortfolioContainer>
            <div>
              <div>
                <strong>🫥</strong>
                <h4>아직 자기 소개를 작성하지 않으셨어요!</h4>
                <span>
                  자기 소개를 작성해야 부모님에게 내 프로필이 노출됩니다
                </span>
              </div>
              <Link to="/create">
                <FilledButton text="자기소개서 작성하기" />
              </Link>
            </div>
          </StyledPortfolioContainer>
          <TherapistProfile data={userDetailInfoById} />
        </div>
      </StyledMain>
    </section>
  );
}

export default ProfileContent;

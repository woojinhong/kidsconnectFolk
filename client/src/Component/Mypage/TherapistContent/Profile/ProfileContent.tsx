import { useState, useEffect } from "react";
import { StyledMain, StyledProfileSummary } from "./Profile.style";
import { Link } from "react-router-dom";

import { useGetTherapistInfo } from "../../../../Services/ApiHooks";
import TherapistProfile from "../../../TherapistProfile/TherapistProfile";
import { ProfileType } from "./ProfileType";
import ProfileSummary from "./ProfileSummary";
import userDetailInfoById from "../../../../MockData/therapistInfoData.json";

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
    <StyledMain>
      <section>
        <h3>내 프로필</h3>
        <StyledProfileSummary>
          <ProfileSummary therapistInfo={therapistInfo} button={true} />
        </StyledProfileSummary>
      </section>
      <section>
        <h3>자기 소개</h3>
        <div>
          <div>
            <div>
              <img />
              <h4>아직 자기 소개를 작성하지 않으셨어요!</h4>
              <span>
                자기 소개를 작성해야 부모님에게 내 프로필이 노출됩니다
              </span>
            </div>
            <Link to="/create">
              <button>자기 소개 작성하기</button>
            </Link>
          </div>
        </div>
        <TherapistProfile data={userDetailInfoById} />
      </section>
    </StyledMain>
  );
}

export default ProfileContent;

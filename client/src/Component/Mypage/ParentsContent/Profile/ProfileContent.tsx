import { useState, useEffect } from "react";

import { StyledMain } from "../../TherapistContent/Profile/Profile.style";
import OutlineButton from "../../../Common/Button/OutlineButton";
import ChildCard from "../../../Common/Card/ChildCard/ChildCard";
import ReviewList from "../../../Common/Review/ReviewList";

import { useGetParentInfo } from "../../../../Services/ApiHooks";
import ImgProfile from "../../../../Assets/Image/ImgProfile.svg";

function ProfileContent() {
  const [userInfo, setUserInfo] = useState<ProfileType>({} as ProfileType);
  const [childLength, setChildLength] = useState<number>(0);
  const [reviewLength, setReviewLength] = useState<number>(0);

  const { getParentInfo } = useGetParentInfo();

  useEffect(() => {
    const fetchUserData = async () => {
      return setUserInfo(await getParentInfo());
    };
    fetchUserData();
  }, []);

  const getCardLength = (category: string, length: number) => {
    if (category === "child") {
      setChildLength(length);
    } else {
      setReviewLength(length);
    }
  };

  return (
    <section>
      <StyledMain>
        <section>
          <h3>마이페이지</h3>
          <div>
            <div>
              <div>
                <img src={ImgProfile} />
                <div>
                  <h4>
                    <span>
                      {userInfo.lastName}
                      {userInfo.firstName}
                    </span>
                    부모님
                  </h4>
                </div>
              </div>
              <OutlineButton variant="m_outline" text="프로필 수정" />
            </div>
            <ul>
              <li>{userInfo.phoneNum}</li>
              <li>
                {userInfo.address}
                {userInfo.addressDetail}
              </li>
            </ul>
            <div>
              <div>
                <h4>
                  아이<span>{childLength}</span>
                </h4>
                <ChildCard getCardLength={getCardLength} />
              </div>
              <div>
                <h4>
                  내가 쓴 리뷰<span>{reviewLength}</span>
                </h4>
                <ReviewList userInfo={userInfo} getCardLength={getCardLength} />
              </div>
            </div>
          </div>
        </section>
      </StyledMain>
    </section>
  );
}

export default ProfileContent;

type ProfileType = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  addressDetail: string;
  phoneNum: string;
};

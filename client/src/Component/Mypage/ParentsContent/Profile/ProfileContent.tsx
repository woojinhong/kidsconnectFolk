import { StyledMain } from "../../TherapistContent/Profile/Profile.style";
import OutlineButton from "../../../Common/Button/OutlineButton";
import ChildCard from "../../../Common/Card/ChildCard/ChildCard";
import ReviewList from "../../../Common/Review/ReviewList";

import ImgProfile from "../../../../Assets/Image/ImgProfile.svg";
import userData from "../../../../MockData/userData.json";

function ProfileContent() {
  const userId = 1;
  const userProfileById = userData.find((data) => data.id === userId);
  const { firstName, lastName, address, addressDetail, phoneNum } =
    userProfileById as ProfileType;
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
                      {firstName}
                      {lastName}
                    </span>
                    부모님
                  </h4>
                </div>
              </div>
              <OutlineButton variant="m_outline" text="프로필 수정" />
            </div>
            <ul>
              <li>{phoneNum}</li>
              <li>
                {address}
                {addressDetail}
              </li>
            </ul>
            <div>
              <div>
                <h4>
                  아이<span>length</span>
                </h4>
                <ChildCard />
              </div>
              <div>
                <h4>
                  내가 쓴 리뷰<span>length</span>
                </h4>
                <ReviewList />
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
  phoneNum: string;
  address: string;
  addressDetail: string;
};

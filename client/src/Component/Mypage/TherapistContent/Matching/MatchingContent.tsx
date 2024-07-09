import ChildListCard from "../../../Common/Card/ChildListCard/ChildListCard";

import {
  StyledMain,
  StyledReservationContainer,
} from "../../../../Pages/Mypage/Mypage.style";

function MatchingContent() {
  return (
    <section>
      <StyledMain>
        <div>
          <h3>매칭</h3>
          <StyledReservationContainer>
            <div>
              <h4>
                매칭 신청<span>0</span>
              </h4>
              <i>승인을 하면 연락처와 주소가 부모님께 전달됩니다.</i>
              <div>
                {/* Todo:추후 api 받아오면 map으로 childListcard */}
                <ul>
                  <ChildListCard />
                </ul>
              </div>
            </div>
            <div>
              <h4>
                매칭 완료<span>0</span>
              </h4>
              <div>
                {/* Todo:추후 api 받아오면 map으로 childListcard */}
                <ul>
                  <ChildListCard />
                </ul>
              </div>
            </div>
          </StyledReservationContainer>
        </div>
      </StyledMain>
    </section>
  );
}

export default MatchingContent;

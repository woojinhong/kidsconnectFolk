import ChildListCard from "../../../Common/Card/ChildListCard/ChildListCard";

import { StyledMain } from "../Profile/Profile.style";

function MatchingContent() {
  return (
    <StyledMain>
      <section>
        <h3>매칭</h3>
        <div>
          <div>
            <h4>매칭 신청</h4>
            {/* Todo:추후 api 받아오면 data.length 가져오기*/}
            <span>length</span>
            <i>승인을 하면 연락처와 주소가 부모님께 전달됩니다.</i>
            <div>
              {/* Todo:추후 api 받아오면 map으로 childListcard */}
              <ul>
                <ChildListCard />
              </ul>
            </div>
          </div>
          <div>
            <h4>매칭 완료</h4>
            {/* Todo:추후 api 받아오면 data.length 가져오기*/}
            <span>length</span>
            <div>
              {/* Todo:추후 api 받아오면 map으로 childListcard */}
              <ul>
                <ChildListCard />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </StyledMain>
  );
}

export default MatchingContent;

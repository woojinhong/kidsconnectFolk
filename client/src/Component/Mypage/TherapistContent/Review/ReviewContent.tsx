import { StyledMain } from "../Profile/Profile.style";

function ReviewContent() {
  return (
    <StyledMain>
      <section>
        <h3>리뷰</h3>
        <div>
          <h3>받은 리뷰</h3>
          {/* Todo : 나중에 api 호출 통해서 리뷰들 length 구하기 */}
          <span>length</span>
          {/* Todo : 나중에 api 호출 통해서 리뷰 리스트들 map하기 */}
          <ul>
            <li>땡땡부모님</li>
          </ul>
        </div>
      </section>
    </StyledMain>
  );
}

export default ReviewContent;

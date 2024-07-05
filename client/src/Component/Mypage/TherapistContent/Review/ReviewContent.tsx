import {
  StyledMain,
  StyledEvaluationContainer,
  StyledEmptyReviewContainer,
} from "../../../../Pages/Mypage/Mypage.style";

function ReviewContent() {
  return (
    <section>
      <StyledMain>
        <StyledEvaluationContainer>
          <h3>리뷰</h3>
          <div>
            <h4>
              받은 리뷰<span>0</span>
            </h4>
            <StyledEmptyReviewContainer>
              <h4>아직 받은 리뷰가 없어요!</h4>
            </StyledEmptyReviewContainer>
          </div>
        </StyledEvaluationContainer>
      </StyledMain>
    </section>
  );
}

export default ReviewContent;

import TherapistCard from "../../../Common/Card/TherapistCard/TherapistCard";
import {
  StyledMain,
  StyledMatchingContainer,
} from "../../../../Pages/Mypage/Mypage.style";

function MatchingContent() {
  const matchingTherapistId: number[] = [1];
  const matchedTherapistId: number[] = [2, 3, 4];

  return (
    <section>
      <StyledMain>
        <h3>신청한 매칭</h3>
        <div>
          <StyledMatchingContainer>
            <div>
              <h4>
                매칭 중<span>0</span>
              </h4>
              <div>
                {matchingTherapistId.map((therapistId) => (
                  <TherapistCard
                    key={therapistId}
                    therapistId={therapistId}
                    variants="applied"
                  />
                ))}
              </div>
            </div>
            <div>
              <h4>
                매칭 완료<span>0</span>
              </h4>
              <div>
                {matchedTherapistId.map((therapistId) => (
                  <TherapistCard
                    key={therapistId}
                    therapistId={therapistId}
                    variants="applied"
                  />
                ))}
              </div>
            </div>
          </StyledMatchingContainer>
        </div>
      </StyledMain>
    </section>
  );
}

export default MatchingContent;

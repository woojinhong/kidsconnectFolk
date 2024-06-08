import TherapistCard from "../../../Common/Card/TherapistCard/TherapistCard";
import { StyledMain } from "../../TherapistContent/Profile/Profile.style";

function MatchingContent() {
  const matchingTherapistId: number[] = [1];
  const matchedTherapistId: number[] = [2, 3, 4];

  return (
    <StyledMain>
      <section>
        <h3>신청한 매칭</h3>
        <div>
          <div>
            <div>
              <h4>
                매칭 중<span>length</span>
              </h4>
              {matchingTherapistId.map((therapistId) => (
                <TherapistCard
                  key={therapistId}
                  therapistId={therapistId}
                  variants="applied"
                />
              ))}
            </div>
            <div>
              <h4>
                매칭 완료<span>length</span>
              </h4>
              {matchedTherapistId.map((therapistId) => (
                <TherapistCard
                  key={therapistId}
                  therapistId={therapistId}
                  variants="applied"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </StyledMain>
  );
}

export default MatchingContent;

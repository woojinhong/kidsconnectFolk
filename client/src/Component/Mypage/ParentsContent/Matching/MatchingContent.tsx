import { useState, useEffect } from "react";
import TherapistCard from "../../../Common/Card/TherapistCard/TherapistCard";

import {
  useGetPendingReservation,
  useGetConfirmedReservation,
} from "../../../../Services/ApiHooks";
import {
  StyledMain,
  StyledMatchingContainer,
} from "../../../../Pages/Mypage/Mypage.style";

function MatchingContent() {
  const [pendingReservation, setPendingReservation] = useState<any[]>([]);
  const [confirmedReservation, setConfirmedReservation] = useState<any[]>([]);
  const { getPendingReservation } = useGetPendingReservation();
  const { getConfirmedReservation } = useGetConfirmedReservation();

  useEffect(() => {
    const fetchReservation = async () => {
      setPendingReservation(await getPendingReservation());
      setConfirmedReservation(await getConfirmedReservation());
    };

    fetchReservation();
  }, []);

  return (
    <section>
      <StyledMain>
        <h3>신청한 매칭</h3>
        <div>
          <StyledMatchingContainer>
            <div>
              <h4>
                매칭 중<span>{pendingReservation.length || "0"}</span>
              </h4>
              <div>
                {pendingReservation.length > 0
                  ? pendingReservation.map((therapistId) => (
                      <TherapistCard
                        key={therapistId}
                        variants="pending"
                        therapistId={therapistId}
                      />
                    ))
                  : "매칭 중인 선생님이 없습니다!"}
              </div>
            </div>
            <div>
              <h4>
                매칭 완료<span>{confirmedReservation.length || "0"}</span>
              </h4>
              <div>{/* 완료된 therapist Id~ */}</div>
            </div>
          </StyledMatchingContainer>
        </div>
      </StyledMain>
    </section>
  );
}

export default MatchingContent;

import { useState, useEffect } from "react";
import {
  CommentText,
  Divider,
  ReviewContainer,
  StarImage,
  StarsContainer,
  StyledCard,
  UserName,
  UserTitle,
  RatingText,
} from "./ReviewList.styles";
import starSvg from "../../../Assets/Image/star.svg";

const ReviewList = ({
  getCardLength,
  userInfo,
}: {
  getCardLength: (category: string, length: number) => void;
  userInfo: userName;
}) => {
  const [therapistReviewData, setTherapistReviewData] = useState<Review[]>(
    [] as Review[]
  );

  // useEffect로 불러오기

  if (!therapistReviewData.length) {
    return (
      <div>
        <h4>아직 작성하신 리뷰가 없습니다</h4>
      </div>
    );
  }

  return (
    <ReviewContainer>
      {therapistReviewData.map((review: Review) => {
        return (
          <li key={review.id}>
            <StyledCard>
              {userInfo && (
                <CommentText>
                  {renderStars(review.rating)}
                  <UserName>
                    {userInfo.firstName}
                    {userInfo.lastName}
                  </UserName>
                  <UserTitle> 부모님</UserTitle>
                </CommentText>
              )}
              <CommentText>
                {review.comment}
                <Divider />
              </CommentText>
            </StyledCard>
          </li>
        );
      })}
    </ReviewContainer>
  );
};

export default ReviewList;

const renderStars = (rating: number): JSX.Element => {
  return (
    <StarsContainer>
      <StarImage src={starSvg} alt="star" />
      <RatingText>{rating.toFixed(1)}</RatingText>
    </StarsContainer>
  );
};
interface Review {
  id: number;
  userId: number;
  therapistId: number;
  rating: number;
  gender: string;
  comment: string;
  inDate: string;
  upDate: string;
}

type userName = {
  firstName: string;
  lastName: string;
};

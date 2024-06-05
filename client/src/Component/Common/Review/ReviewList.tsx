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
import therapistReviewData from "../../../MockData/therapistReviewData.json";
import userData from "../../../MockData/userData.json";
import starSvg from "../../../Assets/Image/star.svg";

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

const ReviewList = () => {
  const renderStars = (rating: number): JSX.Element => {
    return (
      <StarsContainer>
        <StarImage src={starSvg} alt="star" />
        <RatingText>{rating.toFixed(1)}</RatingText>
      </StarsContainer>
    );
  };

  return (
    <ReviewContainer>
      {therapistReviewData.map((review: Review) => {
        const user = userData.find((user) => user.id === review.userId);

        return (
          <li key={review.id}>
            <StyledCard>
              {user && (
                <CommentText>
                  {renderStars(review.rating)}
                  <UserName>
                    {user.lastName}
                    {user.firstName}
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

import {
  CommentText,
  Divider,
  ReviewContainer,
  StarImage,
  StarsContainer,
  StyledCard,
  UserName,
  UserTitle,
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
        <CommentText size="sm">{rating.toFixed(1)}</CommentText>
      </StarsContainer>
    );
  };

  return (
    <ReviewContainer>
      {therapistReviewData.map((review: Review) => {
        const user = userData.find((user) => user.id === review.userId);

        return (
          <StyledCard key={review.id}>
            {user && (
              <CommentText size="14px">
                {renderStars(review.rating)}
                <UserName>
                  {user.lastName}
                  {user.firstName}
                </UserName>
                <UserTitle> 부모님</UserTitle>
              </CommentText>
            )}
            <CommentText size="12px">
              {review.comment}
              <Divider />
            </CommentText>
          </StyledCard>
        );
      })}
    </ReviewContainer>
  );
};

export default ReviewList;

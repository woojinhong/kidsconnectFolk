import { useEffect, useState } from "react";
import {
  StyledCard,
  InfoGroup,
  DescriptionText,
  TagContainer,
} from "./ChildCard.styles";
import Edit from "../../../../Assets/Image/Edit.svg";
import childData from "../../../../MockData/childData.json";
import symptomData from "../../../../MockData/child_symptomData.json";
import Tag from "../../Tag/Tag";
import Plus from "../../../../Assets/Image/Plus.svg";

interface Child {
  id: number;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  personality: string;
}

interface SymptomData {
  id: number;
  symptomId: number;
  symptomData: string[];
}

const ChildCard = () => {
  const [child, setChild] = useState<Child | null>(null);
  const [symptomTags, setSymptomTags] = useState<string[]>([]);

  useEffect(() => {
    if (!childData || childData.length === 0) return;

    const selectedChild = childData[0] as Child;
    setChild(selectedChild);

    const childSymptom = symptomData.find(
      (data: SymptomData) => data.id === selectedChild.id
    );

    if (childSymptom) {
      setSymptomTags(childSymptom.symptomData);
    }
  }, []);

  if (!child) {
    return <StyledCard>No child data available</StyledCard>;
  }

  const { lastName, firstName, dateOfBirth, personality } = child;
  const age = calculateAge(dateOfBirth);

  const truncatedPersonality =
    personality.length > 100 ? `${personality.slice(0, 100)}...` : personality;

  const handleEdit = () => {
    // Edit 기능 구현
  };

  return (
    <div>
      <StyledCard>
        <InfoGroup>
          <div style={{ fontWeight: 700 }}>
            {lastName}
            {firstName}
            <span style={{ fontWeight: 400, marginLeft: "4px" }}>{age}세</span>
          </div>
          <img
            src={Edit}
            alt="Edit"
            onClick={handleEdit}
            style={{ cursor: "pointer", width: "20px", height: "20px" }}
          />
        </InfoGroup>

        <DescriptionText>{truncatedPersonality}</DescriptionText>

        <TagContainer>
          {symptomTags.map((tag, index) => (
            <div key={index}>
              <Tag value={tag} />
            </div>
          ))}
        </TagContainer>
      </StyledCard>

      <StyledCard onClick={handleRegisterChild}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={Plus} alt="Registering a child" />
          <div style={{ fontWeight: 500, fontSize: "14px", marginTop: "10px" }}>
            아이 등록하기
          </div>
        </div>
      </StyledCard>
    </div>
  );
};

function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

function handleRegisterChild() {
  // 아이 등록하기 기능 구현
}

export default ChildCard;

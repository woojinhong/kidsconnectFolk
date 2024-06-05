import { useEffect, useState } from "react";

import Tag from "../../Tag/Tag";
import Modal from "../../Modal/Modal";

import {
  StyledCard,
  InfoGroup,
  DescriptionText,
  TagContainer,
  StyledCardContainer,
} from "./ChildCard.styles";

import Edit from "../../../../Assets/Image/Edit.svg";
import SymbolFemale from "../../../../Assets/Image/Icon/SymbolFemale.svg";
import SymbolMale from "../../../../Assets/Image/Icon/SymbolMale.svg";
import childData from "../../../../MockData/childData.json";
import symptomData from "../../../../MockData/child_symptomData.json";

interface Child {
  id: number;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  personality: string;
  gender: string;
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

  const addChildCard = () => (
    <Modal
      buttonVariant="addChild"
      buttonText="아이 등록하기"
      content={() => <div>hi</div>}
    />
  );

  if (!child) {
    return addChildCard();
  }

  const { lastName, firstName, dateOfBirth, personality, gender } = child;
  const age = calculateAge(dateOfBirth);

  const truncatedPersonality =
    personality.length > 100 ? `${personality.slice(0, 100)}...` : personality;

  const handleEdit = () => {
    // Edit 기능 구현
  };

  return (
    <StyledCardContainer>
      <StyledCard>
        <InfoGroup>
          <div style={{ fontWeight: 700 }}>
            {lastName}
            {firstName}
            <span style={{ fontWeight: 400, marginLeft: "4px" }}>{age}세</span>
            <img src={gender === "female" ? SymbolFemale : SymbolMale} />
          </div>
          <img
            src={Edit}
            alt="Edit"
            onClick={handleEdit}
            style={{ cursor: "pointer", width: "16px", height: "16px" }}
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
      {addChildCard()}
    </StyledCardContainer>
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

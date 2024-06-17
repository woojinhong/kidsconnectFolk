import { useEffect, useState } from "react";

import Tag from "../../Tag/Tag";
import Modal from "../../Modal/Modal";
import { useGetChildAge } from "../../../../Services/CustomHooks";

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

const ChildCard = () => {
  const [child, setChild] = useState<Child>({} as Child);
  const [symptomTags, setSymptomTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setChild(childData[0]);
    const childSymptom = symptomData.find(
      (data: SymptomData) => data.id === child.id
    );

    if (childSymptom) {
      setSymptomTags(childSymptom.symptomData);
    }
  }, []);

  const { lastName, firstName, dateOfBirth, personality, gender } = child;
  const age = useGetChildAge(dateOfBirth);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const addChildCard = () => (
    <Modal
      buttonVariant="addChild"
      buttonText="아이 등록하기"
      content="addChild"
      chatInput={true}
      isOpen={isModalOpen}
      onClose={closeModal}
      onOpen={openModal}
    />
  );

  if (!child) {
    return addChildCard();
  }
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
            style={{ cursor: "pointer", width: "16px", height: "16px" }}
          />
        </InfoGroup>

        <DescriptionText>{personality}</DescriptionText>

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

export default ChildCard;

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

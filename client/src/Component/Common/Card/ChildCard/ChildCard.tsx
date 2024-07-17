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
import { useGetParentChildInfo } from "../../../../Services/ApiHooks";

import Edit from "../../../../Assets/Image/Edit.svg";
import SymbolFemale from "../../../../Assets/Image/Icon/SymbolFemale.svg";
import SymbolMale from "../../../../Assets/Image/Icon/SymbolMale.svg";

const ChildCard = ({
  getCardLength,
}: {
  getCardLength: (category: string, length: number) => void;
}) => {
  const [childData, setChildData] = useState<Child[]>([] as Child[]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { getParentChildInfo } = useGetParentChildInfo();

  useEffect(() => {
    const fetchParentChildInfo = async () => {
      const parentChildInfo = await getParentChildInfo();
      setChildData(parentChildInfo);
      getCardLength("child", parentChildInfo.length);
    };
    fetchParentChildInfo();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const addChildCard = () => (
    <li>
      <Modal
        buttonVariant="addChild"
        buttonText="아이 등록하기"
        content="addChild"
        chatInput={true}
        isOpen={isModalOpen}
        onClose={closeModal}
        onOpen={openModal}
      />
    </li>
  );

  if (!childData) {
    return addChildCard();
  }
  return (
    <StyledCardContainer>
      {childData.map((child: Child, index) => mappingChildData(index, child))}
      {addChildCard()}
    </StyledCardContainer>
  );
};

export default ChildCard;

const mappingChildData = (index: number, child: Child) => {
  const { lastName, firstName, dateOfBirth, gender, personality, symptomName } =
    child;
  const age = useGetChildAge(dateOfBirth);
  return (
    <li key={index}>
      <StyledCard>
        <InfoGroup>
          <div style={{ fontWeight: 700 }}>
            {firstName}
            {lastName}
            <span style={{ fontWeight: 400, marginLeft: "4px" }}>{age}세</span>
            <img src={gender === "F" ? SymbolFemale : SymbolMale} />
          </div>
          <img
            src={Edit}
            alt="Edit"
            style={{ cursor: "pointer", width: "16px", height: "16px" }}
          />
        </InfoGroup>

        <DescriptionText>{personality}</DescriptionText>

        <TagContainer>
          {symptomName.map((tag: string) => (
            <div key={tag}>
              <Tag value={tag} />
            </div>
          ))}
        </TagContainer>
      </StyledCard>
    </li>
  );
};

interface Child {
  id: number;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  personality: string;
  gender: string;
  symptomName: string[];
}

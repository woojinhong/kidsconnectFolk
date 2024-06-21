import { useState } from "react";
import { useGetChildAge } from "../../../../Services/CustomHooks";

import Tag from "../../Tag/Tag";
import ButtonIcon from "../../Button/ButtonIcon/ButtonIcon";

import ChildData from "../../../../MockData/childData.json";
import ChildSymptomData from "../../../../MockData/child_symptomData.json";
import UserData from "../../../../MockData/userData.json";

import SymbolFemale from "../../../../Assets/Image/Icon/SymbolFemale.svg";
import SymbolMale from "../../../../Assets/Image/Icon/SymbolMale.svg";
import IconAlertCircle from "../../../../Assets/Image/Icon/IconAlertCircle.svg";

import {
  StyledCardContainer,
  StyledTextInfoWrapper,
  StyledChildInfoWrapper,
  StyledAlertWrapper,
  StyledSymptomWrapper,
  StyledCheckboxWrapper,
} from "./ChildListCard.style";
import {
  ChildDataType,
  ChildSymptomDataType,
  UserDataType,
} from "./ChildListCardType";

function ChildListCard() {
  // Todo: 후에 API 연동 시 데이터를 받아오는 부분을 수정해야 함
  const [appliedCareAtHome, setAppliedCareAtHome] = useState<boolean>(true);
  const [isMatched, setIsMatched] = useState<boolean>(false);

  const { id, userId, firstName, lastName, gender, dateOfBirth, personality } =
    ChildData[0] as ChildDataType;

  const childSymptomDataById = ChildSymptomData.filter(
    (data: ChildSymptomDataType) => data.id === id
  );

  const userDataById = UserData.filter(
    (data: UserDataType) => data.id === userId
  )[0];

  const symptomData = childSymptomDataById[0].symptomData;

  return (
    <StyledCardContainer>
      <StyledTextInfoWrapper>
        <StyledSymptomWrapper>
          {symptomData?.map((symptom) => {
            return <Tag key={symptom} value={symptom}></Tag>;
          })}
        </StyledSymptomWrapper>
        <StyledChildInfoWrapper>
          <ul>
            <li>
              {lastName}
              {firstName}
            </li>
            <li>{useGetChildAge(dateOfBirth)}세</li>
            <li>
              <img src={gender === "여" ? SymbolFemale : SymbolMale} />
            </li>
          </ul>
          {personality ? <p>{personality}</p> : null}
          {appliedCareAtHome ? (
            <StyledAlertWrapper>
              <div>
                <img src={IconAlertCircle} />
                <span>부모님 집에서 치료받길 원해요</span>
              </div>
              <address>{userDataById.address}</address>
            </StyledAlertWrapper>
          ) : null}
        </StyledChildInfoWrapper>
      </StyledTextInfoWrapper>
      {isMatched ? null : (
        <StyledCheckboxWrapper>
          <ButtonIcon type="reject" />
          <ButtonIcon />
        </StyledCheckboxWrapper>
      )}
    </StyledCardContainer>
  );
}

export default ChildListCard;

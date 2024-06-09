import { useState, useEffect } from "react";
import { StyledContainer, StyledSelectbox } from "./SelectBoxDefault.styles";
import { SelectBoxDefaultProps } from "./SelectBoxDefaultProps";

import selectboxData from "../../../Assets/TextData/selectboxData";
import { categoryDefaultType } from "../../../Assets/TextData/selectboxData";

import arrowDown from "../../../Assets/Image/arrowDown.svg";
import arrowUp from "../../../Assets/Image/arrowUp.svg";

function SelectBoxDefault({
  category = "",
  width = "100%",
  height = "56px",
  getData,
  region = "",
  onClear = false,
}: SelectBoxDefaultProps) {
  const [value, setValue] = useState<string | null>("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const arrowIcon = isFocused ? arrowUp : arrowDown;

  const categoryData: categoryDefaultType | undefined = selectboxData.find(
    (data) => data.type === category
  );

  useEffect(() => {
    if (onClear) {
      setValue(null);
    }
  }, [onClear]);

  function handleDropdownChange(value: string | null) {
    setValue(value);
    handleisFocused();
    if (category === "region" && getData) {
      getData(switchRegionToEng(value));
    }
  }
  function handleisFocused() {
    setIsFocused(!isFocused);
  }
  function switchRegionToEng(value: string | null) {
    switch (value) {
      case "서울":
        return "seoul";
      case "인천":
        return "incheon";
      case "경기":
        return "gyeonggi";
      default:
        return null;
    }
  }

  const getDetailedRegionData = () => {
    if (categoryData?.detailedRegion && region) {
      const regionData = categoryData.detailedRegion[region];
      return regionData;
    }
    return [];
  };

  const changeData = () => {
    if (category === "detailedRegion") {
      return getDetailedRegionData();
    } else return categoryData?.data;
  };

  return (
    <StyledContainer width={width}>
      <StyledSelectbox
        value={value}
        placeholder={categoryData?.placeholder}
        height={height}
        data={changeData()}
        onChange={handleDropdownChange}
        rightSection={<img src={arrowIcon} />}
        onClear={handleisFocused}
        withCheckIcon={false}
        searchable={true}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        pointer={true}
        styles={{
          dropdown: {
            borderRadius: "16px",
            border: "1px solid #c1c1c1",
            padding: "12px 0 0",
          },
        }}
      />
    </StyledContainer>
  );
}

export default SelectBoxDefault;

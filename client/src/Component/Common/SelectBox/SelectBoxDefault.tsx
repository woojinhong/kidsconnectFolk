import { useState, useEffect } from "react";
import { StyledContainer, StyledSelectbox } from "./SelectBoxDefault.styles";
import { SelectBoxDefaultProps } from "./SelectBoxDefaultProps";

import selectboxData from "../../../Assets/TextData/selectboxData";
import { categoryDefaultType } from "../../../Assets/TextData/selectboxData";

import arrowDown from "../../../Assets/Image/arrowDown.svg";
import arrowUp from "../../../Assets/Image/arrowUp.svg";
import arrowDownWt from "../../../Assets/Image/Icon/arrDownWt.svg";
import arrowUpWt from "../../../Assets/Image/Icon/arrUpWt.svg";

function SelectBoxDefault({
  category = "",
  width = "",
  getData,
  region = "",
  onClear = false,
  defaultSelectedValue,
  variants,
  size = "lg",
  height = "",
}: SelectBoxDefaultProps) {
  const [value, setValue] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const arrowIcon = isFocused ? arrowUp : arrowDown;
  const arrowIconWhite = isFocused ? arrowUpWt : arrowDownWt;

  const categoryData: categoryDefaultType | undefined = selectboxData.find(
    (data) => data.type === category
  );

  useEffect(() => {
    if (onClear) {
      setValue(null);
    } else if (defaultSelectedValue) {
      handleDefaultValueOption(defaultSelectedValue);
    }
  }, [onClear, defaultSelectedValue]);

  function handleDropdownChange(value: string | null) {
    setValue(value);
    handleisFocused();
    if (category === "region" && getData) {
      getData(switchRegionToEng(value));
    } else if (category === "career" && getData) {
      getData(switchCareerToBoolean(value));
    } else if (getData) {
      getData(value);
    }
  }
  function handleisFocused() {
    setIsFocused(!isFocused);
  }
  function handleDefaultValueOption(defaultValue: string | null) {
    if (category === "career") {
      setValue(switchBooleanToCareer(defaultValue));
      return switchBooleanToCareer(defaultValue);
    } else {
      setValue(defaultValue);
      return defaultValue;
    }
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
  function switchCareerToBoolean(value: string | null) {
    switch (value) {
      case "경력 무관":
        return "false";
      case "경력":
        return "true";
      default:
        return null;
    }
  }
  function switchBooleanToCareer(value: string | null) {
    switch (value) {
      case "false":
        return "경력 무관";
      case "true":
        return "경력";
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

  const handleBGColor = (style: "bg" | "color") => {
    if (variants && variants === "filled" && style === "bg") {
      return "#ff7000";
    } else if (variants && variants === "filled" && style === "color") {
      return "#ffffff";
    }
  };

  return (
    <StyledContainer $size={size}>
      <StyledSelectbox
        value={value}
        placeholder={categoryData?.placeholder}
        data={changeData()}
        onChange={handleDropdownChange}
        rightSection={
          variants === "filled" ? (
            <img src={arrowIconWhite} />
          ) : (
            <img src={arrowIcon} />
          )
        }
        onClear={handleisFocused}
        withCheckIcon={false}
        pointer={true}
        styles={{
          dropdown: {
            borderRadius: "16px",
            border: "1px solid #c1c1c1",
            padding: "12px 0 0",
          },
          input: {
            backgroundColor: handleBGColor("bg"),
            color: handleBGColor("color"),
          },
        }}
        $isFocused={isFocused}
        $size={size}
        height={height}
        width={width}
      />
    </StyledContainer>
  );
}

export default SelectBoxDefault;

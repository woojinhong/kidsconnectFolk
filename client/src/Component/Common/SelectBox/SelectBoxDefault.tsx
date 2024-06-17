import { useState, useEffect } from "react";
import { useFocusWithin } from "@mantine/hooks";
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
  const { ref, focused } = useFocusWithin();
  const arrowIcon = focused ? arrowUp : arrowDown;
  const arrowIconWhite = focused ? arrowUpWt : arrowDownWt;

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
    if (category === "career" && getData) {
      getData(switchCareerToBoolean(value));
    } else if (category === "detailRegion" && getData) {
      getData(value);
    } else if (getData) {
      getData(value);
    }
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

  const getDetailRegionData = () => {
    if (categoryData?.detailRegion && region) {
      const regionData = categoryData.detailRegion[region];
      return regionData;
    }
    return [];
  };

  const changeData = () => {
    if (category === "detailRegion") {
      return getDetailRegionData();
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
        ref={ref}
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
        $isFocused={focused}
        $size={size}
        height={height}
        width={width}
      />
    </StyledContainer>
  );
}

export default SelectBoxDefault;

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

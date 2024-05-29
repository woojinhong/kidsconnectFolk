// DefaultText.tsx
import React, { useState } from "react";
import { TextStyles } from "./TextStyles";

import iconSearch from "../../../Assets/Image/IconSearch.svg";
import iconSearchHover from "../../../Assets/Image/IconSearchHovered.svg";

interface DefaultTextProps {
  leftText?: string;
  rightText?: string;
  centerText?: string;
  leftIcon?: "search"; // 아이콘 추가 시 여기에 추가
}

const DefaultText: React.FC<DefaultTextProps> = ({
  leftText,
  rightText,
  centerText,
  leftIcon,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  function paddingAccordingToTextAlign(
    leftText: string | undefined,
    rightText: string | undefined,
    centerText: string | undefined
  ) {
    if (leftText) {
      return "6px 24px 6px 0";
    } else if (rightText) {
      return "6px 24px 6px 0";
    } else if (centerText) {
      return "6px 12px 6px";
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        lineHeight: "20px",
        padding: paddingAccordingToTextAlign(leftText, rightText, centerText),
      }}
    >
      <TextStyles
        isHovered={isHovered}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {leftIcon ? (
          isHovered ? (
            <img src={iconSearchHover} />
          ) : (
            <img src={iconSearch} />
          )
        ) : null}
        {leftText}
      </TextStyles>
      <TextStyles
        isHovered={isHovered}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {centerText}
      </TextStyles>
      <TextStyles
        isHovered={isHovered}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {rightText}
      </TextStyles>
    </div>
  );
};

export default DefaultText;

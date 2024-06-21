import { useState, useEffect } from "react";
import { useHover } from "@mantine/hooks";

import CategoryProps from "./CategoryProps";
import { StyledActionIcon, Emoji, Text } from "./Category.styles";

function Category({
  emoji,
  text,
  size = "sm",
  onClick,
  main = false,
  checkbox = true,
  checkedData = [],
  setData = () => {},
  disabled = false,
}: CategoryProps) {
  const [isChecked, setIsChecked] = useState(false);
  const { hovered, ref } = useHover();

  function handleCheckbox() {
    if (onClick) {
      onClick(text, setData);
    }
  }

  useEffect(() => {
    if (checkedData.includes(text)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [checkedData]);

  return (
    <StyledActionIcon
      $ischecked={isChecked}
      size={size}
      $main={main}
      onClick={handleCheckbox}
      ref={ref}
      $hovered={hovered}
      $checkbox={checkbox}
      disabled={disabled}
    >
      <Emoji size={size}>{emoji}</Emoji>
      <Text size={size} style={{ color: determineColor(disabled, isChecked) }}>
        {text}
      </Text>
    </StyledActionIcon>
  );
}

export default Category;

const determineColor = (disabled: boolean, isChecked: boolean) => {
  if (disabled) {
    return "#999999";
  } else if (isChecked) {
    return "#333333";
  } else {
    return "#999999";
  }
};

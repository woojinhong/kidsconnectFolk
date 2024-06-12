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
}: CategoryProps) {
  const [isChecked, setIsChecked] = useState(false);
  const { hovered, ref } = useHover();

  function handleCheckbox() {
    if (onClick) {
      onClick(text, checkedData, setData);
    }
  }

  useEffect(() => {
    if (checkedData.includes(text)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [checkedData, text]);

  return (
    <StyledActionIcon
      $ischecked={isChecked}
      size={size}
      $main={main}
      onClick={handleCheckbox}
      ref={ref}
      $hovered={hovered}
      $checkbox={checkbox}
    >
      <Emoji size={size}>{emoji}</Emoji>
      <Text size={size}>{text}</Text>
    </StyledActionIcon>
  );
}

export default Category;

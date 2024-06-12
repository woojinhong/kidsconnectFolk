import { useState, useEffect } from "react";

import { Button } from "@mantine/core";
import { useHover } from "@mantine/hooks";

import {
  StyledButtonWrapper,
  getButtonStyles,
  getCommonButtonStyles,
} from "./OutlineButton.styles";

interface OutlineButtonProps {
  variant?: "outline" | "m_outline";
  text?: string; // text 속성 추가
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  borderColor?: string;
  disabled?: boolean;
}

function OutlineButton({
  variant = "outline",
  text = "",
  onClick,
  borderColor = "#FF7000",
  disabled,
}: OutlineButtonProps) {
  const { hovered, ref } = useHover();
  const [isDisabled, setIsDisabled] = useState(disabled);

  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);

  return (
    <StyledButtonWrapper ref={ref}>
      <Button
        style={{
          display: "flex",
          ...getButtonStyles(variant),
          ...getCommonButtonStyles(borderColor, isDisabled, hovered),
        }}
        variant={
          variant === "outline"
            ? "filled"
            : variant || variant === "m_outline"
              ? "filled"
              : variant
        }
        color="#FF7000"
        radius={variant === "outline" ? "16px" : "8px"}
        onClick={onClick}
        disabled={isDisabled}
      >
        {text}
      </Button>
    </StyledButtonWrapper>
  );
}

export default OutlineButton;

import { Button } from "@mantine/core";
import { useState } from "react";
import "@mantine/core/styles.css";
import { useHover } from "@mantine/hooks";
import { StyledButtonWrapper, getButtonStyles } from "./OutlineButton.styles";

interface OutlineButtonProps {
  variant?: "outline" | "m_outline";
  text?: string; // text 속성 추가
}

function OutlineButton({ variant = "outline", text = "" }: OutlineButtonProps) {
  const [clicked, setClicked] = useState(false);
  const { hovered, ref } = useHover();

  return (
    <StyledButtonWrapper ref={ref}>
      <Button
        style={{
          display: "flex",
          ...getButtonStyles(variant, hovered),
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
        className=""
        onClick={() => setClicked(!clicked)}
      >
        {text}
      </Button>
    </StyledButtonWrapper>
  );
}

export default OutlineButton;

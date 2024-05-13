import { Button } from "@mantine/core";
import { useState } from "react";
import "@mantine/core/styles.css";
import { useHover } from "@mantine/hooks";
import { StyledButtonWrapper, getButtonStyles } from "./OutlineButton.styles";

function OutlineButton({ variant = "outline" }) {
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
        <span>버튼</span>
      </Button>
    </StyledButtonWrapper>
  );
}

export default OutlineButton;

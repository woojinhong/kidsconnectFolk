import { Button } from "@mantine/core";
import "@mantine/core/styles.css";
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
  disabled = false,
}: OutlineButtonProps) {
  const { hovered, ref } = useHover();

  return (
    <StyledButtonWrapper ref={ref}>
      <Button
        style={{
          display: "flex",
          ...getButtonStyles(variant),
          ...getCommonButtonStyles(borderColor, disabled, hovered),
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
        disabled={disabled}
      >
        {text}
      </Button>
    </StyledButtonWrapper>
  );
}

export default OutlineButton;

import { Button } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import {
  StyledButton,
  getButtonStyles,
  StyledIcon,
} from "./FilledButton.styles";
import IconSent from "../../../Assets/Image/Icon/IconSent.svg";
import IconSearch from "../../../Assets/Image/Icon/IconSearchWhite.svg";
import { clickButtonEvent } from "../../../Assets/CommonType/EventType";

interface FilledButtonProps {
  variant?: "filled" | "m_filled";
  text?: string;
  backgroundColor?: string;
  onClick?: (event: clickButtonEvent) => void;
  icon?: "send" | "search"; // 필요한 icon 추가하기
  disabled?: boolean;
  submit?: boolean;
  height?: string;
}

function FilledButton({
  variant = "filled",
  disabled = false,
  text = "",
  backgroundColor = "#FF7000",
  onClick,
  icon,
  submit = false,
  height,
}: FilledButtonProps) {
  const { hovered, ref } = useHover();

  function iconMatch(icon: string) {
    switch (icon) {
      case "send":
        return IconSent;
      case "search":
        return IconSearch;
      default:
        return ""; // 필요한 icon 추가하기
    }
  }

  return (
    <StyledButton ref={ref}>
      <Button
        type={submit ? "submit" : "button"}
        disabled={disabled}
        style={getButtonStyles(
          variant,
          disabled,
          hovered,
          backgroundColor,
          height
        )}
        variant={
          variant === "filled" || variant === "m_filled" ? "filled" : variant
        }
        color="#FF7000"
        radius={variant === "filled" ? "16px" : "8px"}
        className=""
        onClick={onClick}
      >
        {icon ? <StyledIcon src={iconMatch(icon)} /> : null}
        <span style={{ color: "#fff" }}>{text}</span>
      </Button>
    </StyledButton>
  );
}

export default FilledButton;

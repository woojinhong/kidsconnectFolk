import { Button } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import DisabledButtonProps from "./DisabledButtonProps";
import {
  StyledButton,
  getButtonStyles,
  StyledIcon,
} from "./FilledButton.styles";
import IconSent from "../../../Assets/Image/Icon/IconSent.svg";
import IconSearch from "../../../Assets/Image/Icon/IconSearchWhite.svg";

interface FilledButtonProps extends DisabledButtonProps {
  variant?: "filled" | "m_filled";
  text?: string;
  backgroundColor?: string;
  onClick?: () => void;
  icon?: "send" | "search"; // 필요한 icon 추가하기
}

function FilledButton({
  variant = "filled",
  disabled = [],
  text = "",
  backgroundColor = "#FF7000",
  onClick,
  icon,
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
        disabled={disabled.length > 0}
        style={getButtonStyles(variant, disabled, hovered, backgroundColor)}
        variant={
          variant === "filled" || variant === "m_filled" ? "filled" : variant
        }
        color="#FF7000"
        radius={variant === "filled" ? "16px" : "8px"}
        className=""
        onClick={onClick}
      >
        {icon ? <StyledIcon src={iconMatch(icon)} /> : null}
        <span>{text}</span>
      </Button>
    </StyledButton>
  );
}

export default FilledButton;

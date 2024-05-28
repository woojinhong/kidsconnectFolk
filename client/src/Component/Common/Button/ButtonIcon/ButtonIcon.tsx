import { ActionIcon } from "@mantine/core";

import IconCheck from "../../../../Assets/Image/Icon/IconCheck.svg";
import IconCancel from "../../../../Assets/Image/Icon/IconCancel.svg";

function ButtonIcon({ type = "accept", disabled, onClick }: ButtonIconProps) {
  function borderColorByType(type: string, disabled: boolean | undefined) {
    if (type === "accept") {
      return "#0038FF";
    } else if (disabled) {
      return "#999999";
    } else {
      return "#DA0000";
    }
  }

  function backgroundColorByType(type: string, disabled: boolean | undefined) {
    if (type === "accept") {
      return "#C1CFFF";
    } else if (disabled) {
      return "#c1c1c1";
    } else {
      return "#F8B6B6";
    }
  }

  const checkboxStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "100%",
    border: `1px solid ${borderColorByType(type, disabled)}`,
    backgroundColor: backgroundColorByType(type, disabled),
  };

  return (
    <ActionIcon
      disabled={disabled}
      onClick={onClick}
      styles={{ root: checkboxStyle }}
    >
      {type === "accept" ? <img src={IconCheck} /> : <img src={IconCancel} />}
    </ActionIcon>
  );
}

export default ButtonIcon;

type ButtonIconProps = {
  type?: "accept" | "reject";
  disabled?: boolean;
  onClick?: () => void;
};

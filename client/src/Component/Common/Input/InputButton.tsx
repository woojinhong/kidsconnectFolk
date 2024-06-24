import { Input } from "@mantine/core";
import { clickInputEvent } from "../../../Assets/CommonType/EventType";
import SearchIcon from "../../../Assets/Image/Search.svg";
import UploadIcon from "../../../Assets/Image/Icon/IconUpload.svg";

function InputButton({
  label,
  placeholder,
  onClick,
  disabled,
  value,
  apiIcon,
}: InputButtonPropsType) {
  return (
    <Input.Wrapper
      label={label}
      styles={{
        label: {
          fontSize: "16px",
          fontWeight: 700,
        },
      }}
      required={true}
    >
      <Input
        value={value}
        placeholder={placeholder}
        onClick={onClick}
        onChange={() => {}}
        disabled={disabled}
        rightSection={changeApiIconDueToProps(apiIcon as string)}
        styles={{
          input: {
            cursor: "pointer",
            height: "56px",
            borderRadius: "16px",
            border: "1px solid #c1c1c1",
            fontSize: "16px",
          },
        }}
        rightSectionPointerEvents="none"
        pointer={true}
      ></Input>
    </Input.Wrapper>
  );
}

export default InputButton;

const changeApiIconDueToProps = (iconType: string): JSX.Element => {
  const apiIconDueToIconType = iconType === "search" ? SearchIcon : UploadIcon;
  return (
    <div
      style={{
        width: "32px",
        height: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: "#FFB274",
        borderRadius: "50%",
      }}
    >
      <img
        src={apiIconDueToIconType}
        alt={"주소 찾기"}
        style={{
          cursor: "pointer",
          width: "16px",
          height: "16px",
        }}
      />
    </div>
  );
};

interface InputButtonPropsType {
  label?: string;
  placeholder: string;
  onClick: (event: clickInputEvent) => void;
  disabled?: boolean;
  value: string;
  apiIcon?: "search" | "upload";
}

import { Notification } from "@mantine/core";
import ButtonIcon from "../Button/ButtonIcon/ButtonIcon";

function Toast({
  variant = "accept",
  title = "",
}: {
  variant?: "accept" | "reject";
  title: string;
}) {
  const acceptIcon = <ButtonIcon type="accept" fitContent={true} />;
  const rejectIcon = <ButtonIcon type="reject" fitContent={true} />;

  const titleColor: string = variant === "accept" ? "#0038FF" : "#FF2727";

  return (
    <Notification
      icon={variant === "accept" ? acceptIcon : rejectIcon}
      title={title}
      withCloseButton={false}
      styles={{
        root: {
          width: "654px",
          padding: "24px 0 24px 0",
          display: "flex",
          justifyContent: "center",
          boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.25)",
        },
        title: {
          color: titleColor,
          lineHeight: "1",
          margin: 0,
          fontSize: "18px",
        },
        body: {
          flex: "none",
        },
        icon: {
          width: "26px",
          height: "26px",
          marginRight: "8px",
        },
      }}
    />
  );
}

export default Toast;

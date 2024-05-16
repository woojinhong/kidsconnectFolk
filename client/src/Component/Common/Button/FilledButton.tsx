import { Button } from "@mantine/core";
import { SVGProps, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { useHover } from "@mantine/hooks";
import DisabledButtonProps from "./DisabledButtonProps";
import { StyledButton, getButtonStyles } from "./FilledButton.styles";

interface FilledButtonProps extends DisabledButtonProps {
  variant?: "filled" | "m_filled";
  text?: string;
}

function FilledButton({
  variant = "filled",
  disabled = [],
  text = "",
}: FilledButtonProps) {
  const [clicked, setClicked] = useState(false);
  const { hovered, ref } = useHover();

  const FavouriteIcon = (
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
  ) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      color={"#000000"}
      fill={"none"}
      {...props}
    >
      <path
        d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <StyledButton ref={ref}>
      <Button
        disabled={disabled.length > 0}
        style={getButtonStyles(variant, disabled, clicked, hovered)}
        variant={
          variant === "filled" || variant === "m_filled" ? "filled" : variant
        }
        color="#FF7000"
        radius={variant === "filled" ? "16px" : "8px"}
        className=""
        onClick={() => setClicked(!clicked)}
      >
        {(variant === "filled" && clicked) ||
        (variant === "m_filled" && clicked) ? (
          <FavouriteIcon
            style={{
              width: variant === "filled" ? "20" : "16",
              height: variant === "filled" ? "20" : "16",
              position: "absolute",
              left: variant === "filled" ? "13px" : "8px",
            }}
            color="#FFFFFF"
          />
        ) : null}
        <span
          style={{
            marginLeft:
              clicked && (variant === "filled" || variant === "m_filled")
                ? variant === "filled"
                  ? "20px"
                  : "18px"
                : "0px",
          }}
        >
          {text}
        </span>
      </Button>
    </StyledButton>
  );
}

export default FilledButton;

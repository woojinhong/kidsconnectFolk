import { Pill } from "@mantine/core";
import { TagProps } from "./TagProps";

function Tag({ ...props }: TagProps) {
  const { disabled, size, withRemoveButton, value, color, variant } = props;

  const pillColor: string = !!color ? color : "#F2F2F2";
  const outlineColor: string = !!color ? color : "#666666";
  const pillVariant: string | undefined =
    variant === "outline" ? `1px solid ${outlineColor}` : undefined;
  const fontVariant: string = size === "sm" ? "12px" : "13px";
  const paddingVariant: string = size === "xl" ? "0 12px" : "0 8px";

  return (
    <Pill
      disabled={disabled}
      size={size}
      withRemoveButton={withRemoveButton}
      styles={{
        root: {
          backgroundColor: pillColor,
          border: pillVariant,
          fontSize: fontVariant,
          borderRadius: "8px",
          padding: paddingVariant,
        },
      }}
    >
      {value}
    </Pill>
  );
}

export default Tag;

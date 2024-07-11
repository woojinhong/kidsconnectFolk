import { Pill } from "@mantine/core";
import { TagProps, colorByTagValue } from "./TagProps";

function Tag({ ...props }: TagProps) {
  const { disabled, size, withRemoveButton, value, color, variant } = props;

  const pillColor: string = colorByTagValue(value);
  const outlineColor: string = !!color ? color : "#666666";
  const pillVariant: string =
    variant === "outline" ? `1px solid ${outlineColor}` : "none";
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
          color: "#666666",
        },
        label: {
          marginTop: "1px",
        },
      }}
    >
      {value}
    </Pill>
  );
}

export default Tag;

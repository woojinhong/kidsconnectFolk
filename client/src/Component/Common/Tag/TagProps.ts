import { MantineSize } from "@mantine/core";

export type TagProps = {
  value: string;
  color?: string;
  disabled?: boolean;
  size?: MantineSize;
  withRemoveButton?: boolean;
  variant?: string | undefined;
};

export function colorByTagValue(value: string) {
  switch (value) {
    case "언어발달":
      return "#FFD8B8";
    case "인지발달":
      return "#B5D7C1";
    case "심리재활":
      return "#C1CFFF";
    case "행동재활":
      return "#FED5FF";
    case "특수교육":
      return "#BBE7B7";
    case "창의재활":
      return "#F2EAA0";
    default:
      return "#F2F2F2";
  }
}

import { MantineSize } from "@mantine/core";

export type TagProps = {
  value: string;
  color?: string;
  disabled?: boolean;
  size?: MantineSize;
  withRemoveButton?: boolean;
  variant?: string | undefined;
};

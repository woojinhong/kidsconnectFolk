export interface SelectBoxDefaultProps {
  category: string;
  width?: string;
  height?: string;
  text?: string;
  region?: string | null;
  getData?: (
    value: string | null
  ) => void | React.Dispatch<React.SetStateAction<string[]>>;
  onClear?: boolean;
  filter?: boolean;
  defaultSelectedValue?: string;
  variants?: "filled";
  size?: "sm" | "lg";
}

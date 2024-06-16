interface CategoryProps {
  emoji: string;
  text: string;
  size?: "xxs" | "sm" | "md" | "lg" | "xl";
  onClick?: (
    text: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
  main?: boolean;
  checkbox?: boolean;
  checkedData?: string[];
  setData?: React.Dispatch<React.SetStateAction<string[]>>;
  disabled?: boolean;
}

export default CategoryProps;

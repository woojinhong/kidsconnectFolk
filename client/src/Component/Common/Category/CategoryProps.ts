interface CategoryProps {
  emoji: string;
  text: string;
  size?: "sm" | "md" | "lg" | "xl";
  onClick?: (
    text: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
  main?: boolean;
  checkbox?: boolean;
  checkedData?: string[];
  setData?: React.Dispatch<React.SetStateAction<string[]>>;
}

export default CategoryProps;

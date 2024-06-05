interface CategoryProps {
  emoji: string;
  text: string;
  size?: "sm" | "md" | "lg" | "xl";
  onClick?: (a: string) => void;
  main?: boolean;
  checkbox?: boolean;
}

export default CategoryProps;

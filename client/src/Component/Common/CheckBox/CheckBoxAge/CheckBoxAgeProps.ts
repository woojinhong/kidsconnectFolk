export type CheckBoxAgeBoxProps = {
  label: string;
  description: React.ReactNode;
  checkedData: string[];
  setData?: React.Dispatch<React.SetStateAction<string[]>>;
};

export function titleLineBreak(label: string) {
  if (label.length > 3) {
    return label.slice(0, 2) + "\n" + label.slice(2);
  } else {
    return label;
  }
}

export function classNameAccordingToTitle(title: string) {
  switch (title) {
    case "유아":
      return "enfant";
    case "영아":
      return "jeune_enfant";
    case "초등저학년":
      return "elementaire_jeune";
    case "초등고학년":
      return "elementaire_vieux";
    default:
      return "유아";
  }
}

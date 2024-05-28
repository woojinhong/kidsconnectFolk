import CategoryProps, { emojiMap } from "./CategoryProps";
import { StyledActionIcon, Emoji, Text } from "./Category.styles";

function Category({
  imoge,
  text,
  opacity,
  border,
  backgroundColor,
  fontSize,
  height,
  width,
  fontWeight,
}: CategoryProps) {
  const emoji = emojiMap[imoge] || "❓";
  const isBordered = !!border;

  return (
    <StyledActionIcon
      variant="default"
      opacity={opacity}
      border={border}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      height={height}
      width={width}
      fontWeight={fontWeight}
    >
      <Emoji isBordered={isBordered} fontSize={fontSize} lineHeight={height}>
        {emoji}
      </Emoji>
      <Text isBordered={isBordered} fontSize={fontSize} fontWeight={fontWeight}>
        {text}
      </Text>
    </StyledActionIcon>
  );
}

export default Category;

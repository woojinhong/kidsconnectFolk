// DefaultText.tsx
import React, { useState } from 'react';
import { TextStyles } from './TextStyles';

interface DefaultTextProps {
  leftText: string;
  rightText: string;
  centerText: string;
}

const DefaultText: React.FC<DefaultTextProps> = ({ leftText, rightText, centerText }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <TextStyles isHovered={isHovered} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {leftText}
      </TextStyles>
      <TextStyles isHovered={isHovered} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {centerText}
      </TextStyles>
      <TextStyles isHovered={isHovered} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {rightText}
      </TextStyles>
    </div>
  );
};

export default DefaultText;

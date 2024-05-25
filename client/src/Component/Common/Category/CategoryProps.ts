export const emojiMap: { [key: string]: string } = {
    all: '👶',
    behavior: '👟',
    creativity: '🎨',
    language: '💬',
    recognition: '🧩',
    psychology: '❤️‍🩹',
    special: '📚'
  };

interface CategoryProps {
    imoge: keyof typeof emojiMap;
    text: string;
    opacity?: number;
    border?: string;
    backgroundColor?: string;
    fontSize?: string;
    height?: string;
    width?: string;
    fontWeight?: string;
  }
  
  export default CategoryProps;
  
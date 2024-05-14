import { createTheme } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Noto Sans KR, sans-serif",
  black: "#333",
  fontSizes: {
    xxs: "12px",
    xs: "13px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    xxl: "24px",
  },
  headings: {
    fontFamily: "Noto Sans KR, sans-serif",
    fontWeight: "700",
  },
  colors: {
    gray: [
      "#000000",
      "#333333",
      "#3D3D3D",
      "#666666", //Figma_Gray1
      "#999999", //Figma_Gray2
      "#C1C1C1", //Figma_LightGray1
      "#DADADA",
      "#F2F2F2", //Figma_LightGray2
      "#F6F6F6",
      "#FFFFFF",
    ],
    orange: [
      "#000000",
      "#333333",
      "#4B2101",
      "#7A3600",
      "#AC4C00",
      "#D45E00", //Figma_PC_Dark
      "#FF7000", //Figma_Primary Color
      "#FF923A",
      "#FFB274", //Figma_Light1
      "#FFD8B8", //Figma_Light2
      "#FFECDC",
      "#FFFFFF",
    ],
    blue: [
      "#000000",
      "#333333",
      "#000B32",
      "#00145C",
      "#042188", //Figma_SC_Dark
      "#002ED0",
      "#0038FF", //Figma_Secondary Color
      "#6889FF", //Figma_Light1
      "#8AA4FF",
      "#C1CFFF", //Figma_Light2
      "#E0E7FF",
      "#FFFFFF",
    ],
    subColor: [
      "#BBE7B7", //GreenLight
      "#B5D7C1", //GreenDarkLight
      "#F8B6B6", //RedLight
      "#F2EAA0", //YellowLight
      "#DEC95F", //YellowDarkLight
      "#FED5FF", //PinkLight
      "#E0C7FF", //PurpleLight
      "#DAD7E5", //PurpleDarkLight
      "#CFEFF3", //CyanLight
      "#FF2727", //RedError
    ],
  },
  primaryColor: "orange",
  focusRing: "never",
  defaultRadius: "md",
});

export default theme;

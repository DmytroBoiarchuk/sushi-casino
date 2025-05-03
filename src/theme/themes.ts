import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  rarityColors: {
    COMMON: "rgb(176, 195, 217)",
    UNCOMMON: "rgb(94, 152, 217)",
    RARE: "rgb(136, 71, 255)",
    EPIC: "rgb(211, 44, 230)",
    LEGENDARY: "rgb(255, 215, 0)",
  },
  colors: {
    white: "rgb(255,255,255)",
    black: "#000000",
    dark: "rgb(36,36,36)",
    red: "rgb(255,0,0)",
    yellow: "rgb(227,184,1)",
  },
  breakpoints: {
    mobile: "only screen and (max-width: 540px)",
    tablet: "only screen and (max-width: 820px)",
    desktop: "only screen and (min-width: 1024px)",
  },
};

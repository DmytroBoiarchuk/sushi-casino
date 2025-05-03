import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    rarityColors: {
      COMMON: string;
      UNCOMMON: string;
      RARE: string;
      EPIC: string;
      LEGENDARY: string;
    };
    colors: Record<string, string>;
  }
}

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    rarityColors: {
      common: string;
      uncommon: string;
      semiuncomon: string;
      rare: string;
      epic: string;
      legendary: string;
      mythical: string;
    };
  }
}

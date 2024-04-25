import { PaletteColorOptions } from "@mui/material/styles/createPalette";
declare module "@mui/material/styles/createPalette" {
  export interface PaletteOptions {
    x_header_color?: string;
    x_shadow_color?: string;
    x_tab_view: {
      tabActive: string;
      tabHover: string;
    };
  }

  export interface Palette {
    x_header_color?: string;
    x_shadow_color?: string;
    x_tab_view: {
      tabActive: string;
      tabHover: string;
    };
  }
}

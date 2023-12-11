import { PaletteColorOptions } from '@mui/material/styles/createPalette'
declare module '@mui/material/styles/createPalette' {
    export interface PaletteOptions {
        x_shadow_color?: {
            light: string
            dark: string
        }
    }

    export interface Palette {
        x_shadow_color?: {
            light: string
            dark: string
        }
    }
}
import { ThemeOptions,PaletteOptions } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const default_theme: ThemeOptions = {
    palette: {
        x_shadow_color: {
            light: '#000',
            dark: '#aaa',
        }
    }
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: default_theme,
    reducers: {
        // 修改调色盘
        // mergeTheme(state, action: PayloadAction<Theme>) {
        //     state.theme = deepmerge(state.theme, action.payload)
        // },
        changeDarkMode(state, action: PayloadAction<boolean>) {
            if (state.palette) {
                state.palette.mode = action.payload ? 'dark' : 'light' // 修改主题模式
            } else {
                state.palette = {
                    mode: action.payload ? 'dark' : 'light'
                }
            }
        }
    }
})

export const { changeDarkMode } = themeSlice.actions
export default themeSlice.reducer
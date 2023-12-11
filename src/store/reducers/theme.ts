import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createTheme, Theme } from '@mui/material'
import { deepmerge } from '@mui/utils'

const DEFAULT_THEME = createTheme()

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: DEFAULT_THEME
    },
    reducers: {
        // 修改调色盘
        mergeTheme(state, action: PayloadAction<Theme>) {
            state.theme = deepmerge(state.theme, action.payload)
        }
    }
})

export const { } = themeSlice.actions
export default themeSlice.reducer
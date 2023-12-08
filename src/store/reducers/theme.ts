import { createSlice } from '@reduxjs/toolkit'
import { createTheme } from '@mui/material'

const DEFAULT_THEME = createTheme()

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: DEFAULT_THEME
    },
    reducers: {
        // 修改调色盘
    }
})

export const { } = themeSlice.actions
export default themeSlice.reducer
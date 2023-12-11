import React from 'react'
import { Box, styled } from "@mui/material";
import * as Colors from '@mui/material/colors';

console.log('color', Colors)

const PaletteRoot = styled('div')(({ theme }) => ({
    background: theme.palette.background.paper,
    ".bbb": {
        color: "red"
    }
}))

export default function Palette() {
    return <PaletteRoot>
        <Box className='bbb'>毕福剑</Box>
        你好
    </PaletteRoot>
}
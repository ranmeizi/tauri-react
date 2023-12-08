import React from 'react'
import { Box, styled } from "@mui/material";

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
import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function () {
    return <Box className='tr-window'>
        <Box
            data-tauri-drag-region=""
            className='tr-window__titlebar'
            sx={{ height: '30px', background: '#f0f0f0' }}
        >
            biubiubiu
        </Box>
        {/* 头部 */}
        <Box className="tr-window__main">
            <Outlet />
        </Box>
    </Box>
}
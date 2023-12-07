import React from 'react'
import { Outlet } from 'react-router-dom'

export default function(){
    return <div>
        <div>头部</div>
        {/* 头部 */}
        <Outlet/>
    </div>
}
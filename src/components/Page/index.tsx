import React from 'react'
import { styled } from '@mui/material'

const PageContainer = styled('div')({
    
})

type PageProps = React.PropsWithChildren<{
    className?: string;
}>;

function Page(props: PageProps) {
    return (
        <div>
            {props.children}
        </div>
    )
}
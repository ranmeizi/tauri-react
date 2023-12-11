import React from 'react'
import { styled } from '@mui/material'
import wrapTrackingPage from '@/tracking/page.wrapper';

// 功能页(与布局无关，与需求功能强关联)

const PageRoot = styled('div')({

})

type PageProps = React.PropsWithChildren<{
    className?: string;
}>;

function Page(props: PageProps) {
    return (
        <PageRoot className='tr-page'>
            {props.children}
        </PageRoot>
    )
}

export default wrapTrackingPage(Page)
import { Link } from "react-router-dom"
import Loading1 from "@/components/Loading/Loading1"
import Loading2 from "@/components/Loading/Loading2"
import Palette from "@/components/Palette"
import Page from "@/components/Page"
import { Button } from '@mui/material'
import { invoke } from "@tauri-apps/api/tauri"


/** 用于埋点的 pageId (必须) */
const PAGE_ID = 'page1'

export default function PageA() {
    return <Page pageId={PAGE_ID}>
        A
        <Palette />
        <Loading1 />
        <Loading2 />
        <Link to="/w/b">to b</Link>
        <Link to="/w/mui">to mui</Link>
        <Button onClick={() => {
            invoke('greet', { name: 'boboan' }).then(res => {
                console.log('greet', res)
            })
        }}>greet</Button>
        <Button onClick={() => {
            invoke('async_greet', { name: 'boboan' }).then(res => {
                console.log('greet', res)
            })
        }}>async_greet</Button>

        <Button onClick={() => {
            console.log('open_new_window')
            invoke('open_new_window',{url:'http://localhost:1420/w/mui'}).then(res => {
                console.log('open_new_window', res)
            })
        }}>open_new_window</Button>
    </Page>
}
import { Link } from "react-router-dom"
import Loading1 from "@/components/Loading/Loading1"
import Loading2 from "@/components/Loading/Loading2"
import Palette from "@/components/Palette"
import Page from "@/components/Page"

/** 用于埋点的 pageId (必须) */
const PAGE_ID = 'page1'

export default function PageA() {
    return <Page pageId={PAGE_ID}>
        A
        <Palette />
        <Loading1 />
        <Loading2 />
        <Link to="/b">to b</Link>
        <Link to="/mui">to mui</Link>
    </Page>
}
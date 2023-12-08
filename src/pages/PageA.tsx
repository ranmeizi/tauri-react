import { Link } from "react-router-dom"
import Loading1 from "@/components/Loading/Loading1"
import Loading2 from "@/components/Loading/Loading2"
import Palette from "@/components/Palette"

export default function PageA() {
    return <div>
        A
        <Palette />
        <Loading1 />
        <Loading2 />
        <Link to="/b">to b</Link>
    </div>
}
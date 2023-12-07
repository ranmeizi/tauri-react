import PageA from '@/pages/PageA'
import PageB from '@/pages/PageB'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Redirect({ to }: any) {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(to, { replace: true })
    })
    return null
}

const routes = [
    {
        path: "/",
        element: <Redirect to="/a" />
    },
    {
        path: "/a",
        element: <PageA />
    },
    {
        path: "/b",
        element: <PageB/>
    }
]

export default routes;
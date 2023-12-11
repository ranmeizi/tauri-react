import PageA from '@/pages/PageA'
import * as ModuleB from '@/pages/PageB'
import MuiComps from '@/pages/MuiComps'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Redirect({ to }: any) {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(to, { replace: true })
    })
    return null
}

function delayLoader() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(1)
        }, 5000);
    })
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
        loader: ModuleB.loader,
        element: <ModuleB.default />
    },
    {
        path:'/mui',
        element:<MuiComps />,
    }
]

export default routes;
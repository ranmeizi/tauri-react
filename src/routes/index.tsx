import PageA from "@/pages/PageA";
import * as ModuleB from "@/pages/PageB";
import MuiComps from "@/pages/MuiComps";
import { useEffect } from "react";
import { useNavigate, RouteObject } from "react-router-dom";
import Window from "@/components/Layout/Window";

function Redirect({ to }: any) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace: true });
  });
  return null;
}

function delayLoader() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 5000);
  });
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Redirect to="/w/a" />,
  },
  {
    path: "/w",
    element: <Window />,
    children: [
      {
        path: "/w/a",
        element: <PageA />,
      },
      {
        path: "/w/b",
        loader: ModuleB.loader,
        element: <ModuleB.default />,
      },
      {
        path: "/w/mui",
        element: <MuiComps />,
      },
    ],
  },
];

export default routes;

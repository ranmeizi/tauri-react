import PageA from "@/pages/introduce/PageA";
import * as ModuleB from "@/pages/introduce/PageB";
import PokemonHandbook from "@/pages/pokedex/PokeDex";
import MuiComps from "@/pages/setting/MuiComps";
import { useEffect } from "react";
import { useNavigate, RouteObject } from "react-router-dom";
import Window from "@/components/Layout/Window";
import ExamplePage1 from "@/pages/examples/RouterTransition/mobile/Page1";
import ExamplePage2 from "@/pages/examples/RouterTransition/mobile/Page2";
import ExampleDirePage1 from "@/pages/examples/RouterTransition/direction/Page1";
import ExampleDirePage2 from "@/pages/examples/RouterTransition/direction/Page2";

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
      {
        path: "/w/handbook",
        element: <PokemonHandbook />,
      },
      {
        path: "/w/example/router-transition/mobile/page1",
        element: <ExamplePage1 />,
      },
      {
        path: "/w/example/router-transition/mobile/page2",
        element: <ExamplePage2 />,
      },
      {
        path: "/w/example/router-transition/direction/page1",
        element: <ExampleDirePage1 />,
      },
      {
        path: "/w/example/router-transition/direction/page2",
        element: <ExampleDirePage2 />,
      },
    ],
  },
];

export default routes;

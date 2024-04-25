import PageA from "@/pages/introduce/PageA";
import * as ModuleB from "@/pages/introduce/PageB";
import MuiComps from "@/pages/setting/MuiComps";
import { useEffect } from "react";
import { useNavigate, RouteObject, defer, Link } from "react-router-dom";
import Window from "@/components/Layout/Window";
import ExamplePage1 from "@/pages/examples/RouterTransition/mobile/Page1";
import ExamplePage2 from "@/pages/examples/RouterTransition/mobile/Page2";
import ExampleDirePage1 from "@/pages/examples/RouterTransition/direction/Page1";
import ExampleDirePage2 from "@/pages/examples/RouterTransition/direction/Page2";
import ExampleTabPageA from "@/pages/examples/TabView/PageA";
import ExampleTabPageB from "@/pages/examples/TabView/PageB";
import TagView from "@/components/Layout/TagView";
import { Box } from "@mui/material";
import TransitionRoutes from "@/components/Layout/TransitionRoutes";
import Homepage from "@/pages/Homepage";
import TrackingLog from "@/pages/examples/TrackingLog";

function Redirect({ to }: any) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace: true });
  });
  return null;
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Redirect to="/w/home" />,
  },
  {
    path: "/w",
    element: <Window />,
    children: [
      {
        path: "/w/home",
        element: <Homepage />,
      },
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
        path: "/w/tracking-log",
        element: <TrackingLog />,
      },
      {
        path: "/w/tr",
        element: <TransitionRoutes />,
        children: [
          {
            path: "/w/tr/example/router-transition/mobile/page1",
            element: <ExamplePage1 />,
          },
          {
            path: "/w/tr/example/router-transition/mobile/page2",
            element: <ExamplePage2 />,
          },
          {
            path: "/w/tr/example/router-transition/direction/page1",
            element: <ExampleDirePage1 />,
          },
          {
            path: "/w/tr/example/router-transition/direction/page2",
            element: <ExampleDirePage2 />,
          },
        ],
      },
      {
        path: "/w/t",
        element: (
          <TagView
            namespace="default"
            homepage="/w/t/default"
            header={<Header />}
          />
        ),
        children: [
          {
            path: "/w/t/default",
            element: null,
          },
          {
            path: "/w/t/page-a",
            loader: Meta({
              title: "Page A",
            }),
            element: <ExampleTabPageA />,
          },
          {
            path: "/w/t/page-b",
            loader: Meta({
              title: "Page B",
            }),
            element: <ExampleTabPageB />,
          },
        ],
      },
    ],
  },
];

export default routes;

type Meta = {
  title: string;
};

function Meta(_: Meta) {
  return () => defer(_);
}

function Header() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "200px",
        minWidth: "200px",
      }}
    >
      <Box sx={{ marginLeft: "12px", marginRight: "12px", fontSize: "14px" }}>
        TagView 示例
      </Box>
      <Link to="#" onClick={() => navigate(-1)} style={{ fontSize: "14px" }}>
        Back
      </Link>
    </Box>
  );
}

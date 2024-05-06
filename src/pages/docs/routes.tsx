import { Outlet, RouteObject } from "react-router-dom";
import DocView from ".";
import DocWindowHeader from "./views/introduce/window-header";
import { TreeViewBaseItem } from "@mui/x-tree-view";
import DocTauriReact from "./views/tauri-react";

type MenuType = {
  title: string;
  path: string;
  element?: RouteObject["element"];
  children?: MenuType[];
};

const menu: MenuType[] = [
  {
    title: "Tauri React",
    path: "/w/doc/tauri-react",
    element: <DocTauriReact />,
  },
  {
    title: "项目介绍",
    path: "/w/doc/introduce",
    children: [
      {
        title: "Window HTML头部",
        path: "/w/doc/introduce/window-header",
        element: <DocWindowHeader />,
      },
    ],
  },
];

const route = {
  path: "/w/doc",
  element: <DocView />,
  children: transformToRoutes(menu),
};

const tree = transformToTree(menu);

function transformToTree(menu: MenuType[]): TreeViewBaseItem[] {
  return menu.map((item) => {
    return {
      id: item.path,
      label: item.title,
      children: transformToTree(item.children || []),
    };
  });
}

function transformToRoutes(menu: MenuType[]): RouteObject[] {
  return menu.map((item) => {
    return {
      path: item.path,
      element: item.element,
      children: transformToRoutes(item.children || []),
    };
  });
}

export { route, tree };

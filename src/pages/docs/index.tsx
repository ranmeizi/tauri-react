import DarkModeSwitch from "@/pages/setting/components/DarkModeSwitch";
import { Box, IconButton, Stack, SxProps, Theme } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import GitHubIcon from "@mui/icons-material/GitHub";
import { invoke } from "@tauri-apps/api";
import { Outlet, useNavigate } from "react-router-dom";
import { SimpleTreeView, TreeItem, TreeViewBaseItem } from "@mui/x-tree-view";
import LogoText from "@/components/Widgets/LogoText";
import { tree } from "./routes";

const HEADER_HEIGHT = 60;
const ASIDE_WIDTH = 256;

const styleSheet: SxProps<Theme> = (theme) => ({
  height: "100%",
  width: "100%",
  paddingTop: HEADER_HEIGHT + "px",
  overflowY: "scroll",
  position: "relative",
  overflow: "hidden",

  ".doc-layout__header": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: HEADER_HEIGHT + "px",

    ".header": {
      height: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    ".header__settings": {
      position: "absolute",
      right: "24px",
    },
  },
  ".doc-layout__aside": {
    position: "absolute",
    left: 0,
    top: HEADER_HEIGHT + "px",
    padding: "8px",
    width: ASIDE_WIDTH + "px",
    borderRight: `1px solid ${theme.palette.divider}`,
    height: "100%",
  },
  ".doc-layout__main": {
    position: "relative",
    width: `calc(100% - ${ASIDE_WIDTH}px)`,
    height: "100%",
    overflowY: "scroll",
    marginLeft: ASIDE_WIDTH + "px",
  },
});

export default function () {
  const navigate = useNavigate();
  function onTreeClick(e: any, { id, children }: TreeViewBaseItem) {
    if (children && children.length > 0) {
      return;
    }
    navigate(id);
  }

  function renderChildren(children: TreeViewBaseItem[]) {
    return children.map((item) => (
      <TreeItem
        itemId={item.id}
        label={item.label}
        onClick={(e) => onTreeClick(e, item)}
      >
        {renderChildren(item.children || [])}
      </TreeItem>
    ));
  }
  return (
    <Box sx={styleSheet}>
      <header className="doc-layout__header">
        <Header />
      </header>

      <aside className="doc-layout__aside">
        <SimpleTreeView>{renderChildren(tree)}</SimpleTreeView>
      </aside>
      <main className="doc-layout__main">
        <Outlet />
      </main>
    </Box>
  );
}
function Header() {
  return (
    <Box className="header">
      <Box
        display={"flex"}
        flexDirection={"column"}
        fontSize={"24px"}
        marginLeft={"12px"}
      >
        <LogoText text="tauri" />
        <LogoText text="react" />
      </Box>
      <Stack direction={"row"} gap={2} className="header__settings">
        <IconButton>
          <GitHubIcon />
        </IconButton>
        <DarkModeSwitch />
        <IconButton
          onClick={() => {
            // invoke("open_new_window", {
            //   url: "http://localhost:1420/w/mui",
            //   lebel: "window_config",
            //   height: 600,
            //   width: 400,
            // }).then((res) => {
            //   console.log("open_new_window", res);
            // });
            invoke("open_new_window", {
              url: "http://localhost:1420",
              lebel: "window_config" + Math.round(Math.random() * 10),
              height: 800,
              width: 1200,
            }).then((res) => {
              console.log("open_new_window", res);
            });
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}

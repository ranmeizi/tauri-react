import Page from "@/components/Page";
import {
  Box,
  BoxProps,
  IconButton,
  Menu,
  MenuItem,
  SxProps,
  Theme,
} from "@mui/material";
import React, { PropsWithChildren, useMemo, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useTags } from "@/db/dao/AppTags";

const styleSheet: SxProps<Theme> = (theme) => ({
  position: "relative",
  padding: "4px 8px",
  minWidth: "180px",
  maxWidth: "180px",
  borderRadius: "12px",
  backgroundColor: "transparent",
  marginRight: "8px",
  transition: "background-color 0.3s",

  ".tr-tabs__clear-btn": {
    height: "24px",
    width: "24px",
    position: "absolute",
    right: "6px",
    top: "4px",
    padding: 0,

    ".MuiSvgIcon-root": {
      fontSize: "14px",
    },
  },

  "&::before,&::after": {
    height: "24px",
    width: "24px",
    content: "''",
    position: "absolute",
    bottom: "-12px",
    borderRadius: "50%",
    background: "transparent",
    border: `12px solid ${theme.palette.x_tab_view.tabActive}`,
    boxSizing: "content-box",
    opacity: 0,
  },

  "&::before": {
    left: "-36px",
    clipPath: "inset(50% 12px 12px 50%)",
  },
  "&::after": {
    right: "-36px",
    clipPath: "inset(50% 50% 12px 12px)",
  },
  "&.active": {
    height: "36px",
    transition: "0s !important",
    backgroundColor: theme.palette.x_tab_view.tabActive + "!important",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    // marginBottom: "-12px",
    paddingRight: "36px",
    "&::before,&::after": {
      opacity: 1,
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.x_tab_view.tabHover,
  },

  ".tr-tabs__tab-inner": {
    fontSize: "14px",
  },
});

type ClickPos = {
  mouseX: number;
  mouseY: number;
} | null;

export function useTagContentMemu() {
  const [contextMenu, setContextMenu] = useState<ClickPos>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  return [contextMenu, handleContextMenu] as const;
}

type TrTabProps = {
  tag: AppTag;
  namespace: string;
} & BoxProps;

export default React.forwardRef(function TrTab(
  {
    tag,
    namespace,
    children,
    className,
    ...boxProps
  }: PropsWithChildren<TrTabProps>,
  ref
) {
  const cls = useMemo(() => {
    return className ? `tr-tabs__tab ${className}` : `tr-tabs__tab`;
  }, [className]);

  const [contextMenu, handleContextMenu] = useTagContentMemu();

  const { close, closeOther, closeRight, closeAll } = useTags(namespace);

  function onClose() {
    close(tag.key);
  }

  return (
    <Box
      ref={ref}
      className={cls}
      sx={styleSheet}
      onContextMenu={handleContextMenu}
      {...boxProps}
    >
      <span className="tr-tabs__tab-inner">{children}</span>
      <IconButton
        className="tr-tabs__clear-btn"
        size={"small"}
        onClick={() => onClose()}
      >
        <ClearIcon />
      </IconButton>
      <Menu
        open={contextMenu !== null}
        onClose={handleContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem
          onClick={(event) => {
            handleContextMenu(event);
            close(tag.key);
          }}
        >
          关闭
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            handleContextMenu(event);
            closeOther(tag.key);
          }}
        >
          关闭其他
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            handleContextMenu(event);
            closeRight(tag.key);
          }}
        >
          关闭到右侧
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            handleContextMenu(event);
            closeAll();
          }}
        >
          全部关闭
        </MenuItem>
      </Menu>
    </Box>
  );
});

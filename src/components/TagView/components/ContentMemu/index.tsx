import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";

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

  return handleContextMenu;
}

type ContentMenuProps = {
  contextMenu: ClickPos;
  handleClose: () => void;
};

function ContentMenu({ contextMenu, handleClose }: ContentMenuProps) {
  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
    >
      <MenuItem onClick={handleClose}>关闭</MenuItem>
      <MenuItem onClick={handleClose}>关闭其他</MenuItem>
      <MenuItem onClick={handleClose}>关闭到右侧</MenuItem>
      <MenuItem onClick={handleClose}>全部关闭</MenuItem>
    </Menu>
  );
}

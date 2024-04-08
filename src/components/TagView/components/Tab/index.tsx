import Page from "@/components/Page";
import { Box, BoxProps, IconButton, SxProps, Theme } from "@mui/material";
import React, { PropsWithChildren, useMemo } from "react";
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
    bottom: "-4px",
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
    transition: "0s !important",
    backgroundColor: theme.palette.x_tab_view.tabActive + "!important",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    marginBottom: "-12px",
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

type TrTabProps = {
  tag: AppTag;
  namespace: string;
} & BoxProps;

export default function TrTab({
  tag,
  namespace,
  children,
  className,
  ...boxProps
}: PropsWithChildren<TrTabProps>) {
  const cls = useMemo(() => {
    return className ? `tr-tabs__tab ${className}` : `tr-tabs__tab`;
  }, [className]);

  const { close } = useTags(namespace);

  function onClose() {
    close(tag.key);
  }

  return (
    <Box {...boxProps} className={cls} sx={styleSheet}>
      <span className="tr-tabs__tab-inner">{children}</span>
      <IconButton
        className="tr-tabs__clear-btn"
        size={"small"}
        onClick={() => onClose()}
      >
        <ClearIcon />
      </IconButton>
    </Box>
  );
}
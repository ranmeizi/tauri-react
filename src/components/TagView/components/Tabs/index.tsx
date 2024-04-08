import Page from "@/components/Page";
import { Box, SxProps, TabsProps, Theme } from "@mui/material";
import React, { PropsWithChildren, useEffect, cloneElement } from "react";
import TrTab from "../Tab";

const styleSheet: SxProps<Theme> = (theme) => ({
  display: "flex",
  height: "40px",
  width: "100%",
  overflowX: "scroll",
  overflowY: "hidden",
  padding: "4px 18px",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  position: "relative",
});

type TrTabsProps = Omit<TabsProps, "onClick" | "onChange"> & {
  items: AppTag[];
  namespace?: string;
  onChange?: (v: number) => void;
};

export default function TrTabs({
  items,
  value,
  namespace = "default",
  onChange,
  children,
}: PropsWithChildren<TrTabsProps>) {
  function onTabClick(e: any, index: number) {
    onChange && onChange(index);
  }

  return (
    <Box className="tr-tabs" sx={styleSheet}>
      {items.map((item, index) => (
        <TrTab
          onClick={(e) => onTabClick(e, index)}
          tag={item}
          namespace={namespace}
          className={value === index ? "active" : undefined}
        >
          {item.title}
        </TrTab>
      ))}
    </Box>
  );
}

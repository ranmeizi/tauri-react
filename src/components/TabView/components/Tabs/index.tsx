import Page from "@/components/Page";
import { Box, SxProps, TabsProps, Theme } from "@mui/material";
import React, { PropsWithChildren, useEffect, cloneElement } from "react";

const styleSheet: SxProps<Theme> = (theme) => ({
  display: "flex",
  width: "100%",
  overflowX: "scroll",
  padding: "4px 18px",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

type TrTabsProps = Omit<TabsProps, "onClick"> & {
  onChange: (v: number) => void;
};

export default function TrTabs({
  value,
  onChange,
  children,
}: PropsWithChildren<TrTabsProps>) {
  useEffect(() => {
    // 找到对应 tab scrollIntoView
  }, [value]);

  function onTabClick(index: number) {
    onChange && onChange(index);
  }

  console.log(children);

  return (
    <Box className="tr-tabs" sx={styleSheet}>
      {children instanceof Array
        ? children.map((el, index) =>
            React.cloneElement(el, {
              onClick: (e: any) => onTabClick(index),
              className: value === index ? "active" : undefined,
            })
          )
        : children}
    </Box>
  );
}

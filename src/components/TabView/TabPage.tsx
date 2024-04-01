import Page from "@/components/Page";
import wrapTrackingPage from "@/tracking/page.wrapper";
import { Box, styled, BoxProps } from "@mui/material";
import React from "react";

const TabPageRoot = styled(Box)({});
type PageProps = React.PropsWithChildren<BoxProps>;

function TabPage({ className, children, ...boxProps }: PageProps) {
  return (
    <TabPageRoot className={`tr-tab-page ${className || ""}`} {...boxProps}>
      {children}
    </TabPageRoot>
  );
}

export default wrapTrackingPage(TabPage);

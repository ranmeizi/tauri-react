import React, { useEffect } from "react";
import { Box, styled, BoxProps } from "@mui/material";
import wrapTrackingPage from "@/tracking/page.wrapper";

// 功能页(与布局无关，与需求功能强关联)

const PageRoot = styled(Box)({});

type PageProps = React.PropsWithChildren<BoxProps>;

function Page({ className, children, ...boxProps }: PageProps) {
  return (
    <PageRoot className={`tr-page ${className || ""}`} {...boxProps}>
      {children}
    </PageRoot>
  );
}

export default wrapTrackingPage(Page);

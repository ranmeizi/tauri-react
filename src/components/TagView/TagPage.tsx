import Page from "@/components/Page";
import wrapTrackingPage from "@/tracking/page.wrapper";
import { Box, styled, BoxProps } from "@mui/material";
import React, { useEffect } from "react";
import { useLoaderData, useLocation, useRoutes } from "react-router-dom";
import * as AppTagsDAO from "@/db/dao/AppTags";

const TabPageRoot = styled(Box)({});
type PageProps = { namespace?: string } & React.PropsWithChildren<BoxProps>;

function TabPage({
  className,
  children,
  namespace = "default",
  ...boxProps
}: PageProps) {
  let location = useLocation();
  const { title } = useLoaderData() || ({} as any);
  const { add } = AppTagsDAO.useTags(namespace);

  useEffect(() => {
    let key = location.pathname;
    add({
      key,
      title,
      order: 0,
    });
  }, []);
  return (
    <TabPageRoot className={`tr-tab-page ${className || ""}`} {...boxProps}>
      {children}
    </TabPageRoot>
  );
}

export default wrapTrackingPage(TabPage);

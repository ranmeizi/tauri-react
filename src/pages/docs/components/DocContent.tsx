import Page from "@/components/Page";
import { Box, Container, SxProps, Theme } from "@mui/material";
import React, { PropsWithChildren } from "react";

const styleSheet: SxProps<Theme> = (theme) => ({
  padding: "40px 0",
});

export default function DocContent({ children }: PropsWithChildren) {
  return (
    <Container maxWidth="md" sx={styleSheet}>
      {children}
    </Container>
  );
}

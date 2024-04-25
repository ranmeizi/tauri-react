import Page from "@/components/Page";
import { Box, List, ListItem, SxProps, Theme, Stack } from "@mui/material";
import { ReactNode } from "react";

const styleSheet: SxProps<Theme> = (theme) => ({
  width: "100%",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  background: theme.palette.divider,
  ".MuiListItem-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,

    "&:last-child": {
      borderBottom: "none",
    },
  },
  ".label": {
    width: "140px",
  },
  ".field": {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
});

type ListProps = {
  items: {
    label: string;
    field: ReactNode;
  }[];
};

export default function ({ items }: ListProps) {
  return (
    <List sx={styleSheet}>
      {items.map(({ label, field }) => (
        <ListItem>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Box className="label">{label}</Box>
            <Box className="field">{field}</Box>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}

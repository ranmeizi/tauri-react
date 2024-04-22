import TabPage from "@/components/TagView/TagPage";
import { Box, SxProps, Theme } from "@mui/material";
import { Link } from "react-router-dom";

const styleSheet: SxProps<Theme> = (theme) => ({
  padding: "40px",
  ".title": {
    fontSize: "32px",
    fontWeight: "bold",
  },
  ".content": {
    color: "#ccc",
  },
});

/** 用于埋点的 pageId (必须) */
const PAGE_ID = "example-tab-view-pagea";

export default function ExampleTabPageA() {
  return (
    <TabPage pageId={PAGE_ID} sx={styleSheet} className="page-a">
      <div className="title">PageA</div>
      <div className="content">内容和cssinjs</div>
      <div>
        <Link to="/w/t/page-b" replace>
          Page B
        </Link>
      </div>
    </TabPage>
  );
}

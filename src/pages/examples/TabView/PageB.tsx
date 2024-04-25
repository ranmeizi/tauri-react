import TagPage from "@/components/TagView/TagPage";
import { SxProps, Theme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

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
const PAGE_ID = "example-tab-view-pageb";

export default function ExampleTabPageA() {
  return (
    <TagPage
      pageId={PAGE_ID}
      sx={styleSheet}
      className="page-b"
      namespace="default"
    >
      <div className="title">PageB</div>
      <div className="content">内容和cssinjs</div>
      <div>
        <Link to="/w/t/page-a" replace>
          Page A
        </Link>
      </div>
    </TagPage>
  );
}

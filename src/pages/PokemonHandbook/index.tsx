import Page from "@/components/Page";
import { Box, SxProps, Theme } from "@mui/material";
import React from "react";
import { AnimatePresence, motion, AnimationProps } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const styleSheet: SxProps<Theme> = (theme) => ({
  ".pokemonhandbook-root": {
    height: "100%",
    width: "100%",
    fontSize: "32px",
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
  },
  ".pokemonhandbook-left": {
    width: "70%",
    height: "100%",
    background: "red",
  },
  ".pokemonhandbook-right": {
    width: "30%",
    height: "100%",
    background: "blue",
  },
});

/** 用于埋点的 pageId (必须) */
const PAGE_ID = "";

export default function () {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Page pageId={PAGE_ID} sx={styleSheet}>
      <div onClick={() => navigate(-1)}>返回</div>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={ANIMATION_VARIANTS["root"]}
        className="pokemonhandbook-root"
      >
        <motion.div className="pokemonhandbook-left">左边内容</motion.div>
        <motion.div className="pokemonhandbook-right">右边。。。</motion.div>
      </motion.div>
    </Page>
  );
}

const ANIMATION_VARIANTS: Record<string, AnimationProps["variants"]> = {
  root: {
    initial: {
      y: "100%",
      transition: {
        type: "spring",
        duration: 1,
        delay: 0,
      },
    },
    in: {
      y: 0,
      transition: {
        type: "spring",
        duration: 1,
        delay: 0,
      },
    },
    out: {
      y: "200%",
      transition: {
        type: "spring",
        duration: 1,
        delay: 0,
      },
    },
  },
};

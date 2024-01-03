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
  const navigate = useNavigate();
  return (
    <Page pageId={PAGE_ID} sx={styleSheet}>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={ANIMATION_VARIANTS["root"]}
        className="pokemonhandbook-root"
      >
        <div onClick={() => navigate(-1)}>返回</div>
        <div style={{ height: "100%", display: "flex" }}>
          <motion.div className="pokemonhandbook-left">左边内容</motion.div>
          <motion.div className="pokemonhandbook-right">右边。。。</motion.div>
        </div>
      </motion.div>
    </Page>
  );
}

const ANIMATION_VARIANTS: Record<string, AnimationProps["variants"]> = {
  root: {
    initial: {
      y: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        delay: 0,
      },
    },
    in: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5,
        delay: 0,
      },
    },
    out: {
      y: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        delay: 0,
      },
    },
  },
};

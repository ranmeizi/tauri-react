/**
 * 只为了方便 更多动画用 motion
 */
import { useLocation, useNavigationType } from "react-router-dom";
import { motion, MotionProps } from "framer-motion";
import { HTMLAttributes, PropsWithChildren, useMemo } from "react";

type SlideTypes = "top" | "bottom" | "left" | "right";

type CommonVariantsOptions = {
  type: SlideTypes;
  duration?: number;
  reverse?: boolean;
  upperTransition?: boolean; // 只有上面的动画
};

export function createVariants({
  type,
  duration = 1,
  reverse = false,
}: CommonVariantsOptions) {
  const pos = (function () {
    switch (type) {
      case "bottom":
        return !reverse
          ? [{ y: "100%" }, { y: 0 }, { y: "-100%" }]
          : [{ y: "-100%" }, { y: 0 }, { y: "100%" }];
      case "top":
        return !reverse
          ? [{ y: "-100%" }, { y: 0 }, { y: "100%" }]
          : [{ y: "100%" }, { y: 0 }, { y: "-100%" }];
      case "left":
        return !reverse
          ? [{ x: "-100%" }, { x: 0 }, { x: "100%" }]
          : [{ x: "100%" }, { x: 0 }, { x: "-100%" }];
      case "right":
        return !reverse
          ? [{ x: "100%" }, { x: 0 }, { x: "-100%" }]
          : [{ x: "-100%" }, { x: 0 }, { x: "100%" }];
    }
  })();
  const transition = { duration };

  return {
    initial: {
      ...pos[0],
      transition,
    },
    in: {
      ...pos[1],
      transition,
    },
    out: {
      ...pos[2],
      transition,
    },
  };
}

type Props = Omit<CommonVariantsOptions, "reverse"> &
  MotionProps &
  HTMLAttributes<HTMLDivElement>;

export function MotionSlide({
  type,
  duration,
  upperTransition,
  children,
  ...motionProps
}: PropsWithChildren<Props>) {
  const navType = useNavigationType();

  const variants = useMemo(() => {
    const reverse = navType === "POP";
    return createVariants({ type, duration, reverse, upperTransition });
  }, [navType, type]);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

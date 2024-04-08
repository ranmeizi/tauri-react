import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export default function () {
  const outlet = useOutlet();
  const location = useLocation();

  return (
    <AnimatePresence>
      {outlet ? React.cloneElement(outlet, { key: location.key }) : outlet}
    </AnimatePresence>
  );
}

import React, { useMemo, useLayoutEffect } from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const VerticalCollapse = ({ open, appear, children }) => {
  const rendered = useMemo(() => ({ value: false }), []);

  useLayoutEffect(() => {
    if (!rendered.value && !appear) rendered.value = true;
  }, [rendered, appear]);

  return (
    <AnimatePresence>
      {open && (
        <Box
          overflow='hidden'
          component={motion.div}
          initial={rendered.value ? { height: 0 } : false}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}>
          {children}
        </Box>
      )}
    </AnimatePresence>
  );
};

VerticalCollapse.propTypes = {
  open: PropTypes.bool.isRequired,
  appear: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default React.memo(VerticalCollapse);

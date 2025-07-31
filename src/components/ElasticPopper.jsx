import React, { useState, useEffect } from "react";
import { Popper } from "@mui/material";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ElasticPopper = React.memo(({ open, children, ...props }) => {
  const [visible, setVisible] = useState(open);
  const [visibleMotion, setVisibleMotion] = useState(false);

  const variants = {
    open: { height: 240, transition: { type: "spring", stiffness: 100 } },
    closed: { height: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const handleAnimationComplete = () => {
    if (!open) {
      setVisible(false);
    }
  };

  useEffect(() => {
    setVisibleMotion(open ? visible : open);
  }, [visible, open]);

  useEffect(() => {
    if (open) {
      setVisible(true);
    }
  }, [open]);

  return (
    visible && (
      <Popper
        open={visible}
        {...props}
        sx={{
          zIndex: (theme) => theme.zIndex.tooltip,
        }}>
        <motion.div
          initial={visibleMotion ? "open" : "closed"}
          animate={visibleMotion ? "open" : "closed"}
          variants={variants}
          onAnimationComplete={handleAnimationComplete}
          style={{
            position: "relative",
            overflow: "hidden",
          }}>
          {children}
        </motion.div>
      </Popper>
    )
  );
});

ElasticPopper.displayName = "ElasticPopper";

ElasticPopper.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
};

export default ElasticPopper;

import React, { useState, useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, Slide } from "@mui/material";

const ScrollTop = ({ showBelow }) => {
  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Slide direction="up" in={show} mountOnEnter unmountOnExit>
        <Button
          onClick={handleClick}
          sx={{
            display: "flex",
            textAlign: "center",
            position: "fixed",
            bottom: "2vh",
            borderRadius: "10px",
            backgroundColor: "#D2042D",
            '&:hover': {
              backgroundColor: "#b00024",
            },
          }}
          variant="contained"
          aria-label="to top"
          startIcon={<KeyboardArrowUpIcon />}
          endIcon={<KeyboardArrowUpIcon />}
        >
          Scroll Top
        </Button>
      </Slide>
    </div>
  );
};
export default ScrollTop;

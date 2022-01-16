import React, { useState, useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, Slide } from "@mui/material";

const ScrollTop = ({ showBelow }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: `smooth` });
  };

  useEffect(() => {
      const event= window.addEventListener(`scroll`,() => {
        //Check if the vertical scroll pixels is bigger than the showBelow pixels and show button accordingly
        if (window.scrollY > showBelow) {
          if (!show) setShow(true);
        } else {
          if (show) setShow(false);
        }
      } );
      return () => window.removeEventListener(`scroll`, event);
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

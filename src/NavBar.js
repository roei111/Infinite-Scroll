import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#D2042D" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          Infinite Scroll Stock Photos
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;

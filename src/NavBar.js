import React from "react";
import { AppBar, Toolbar} from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#D2042D", marginBottom: "0.5rem" }}>
      <Toolbar>
        <h1 style={{flexGrow: 1, textAlign: "center", fontFamily: "'Caveat', cursive", margin:"0", fontWeight: "400"}}>
          Infinite Scroll Stock Photos
          </h1>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;

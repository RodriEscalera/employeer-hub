import React, { FC } from "react";
import AppBar from "@mui/material/AppBar";
import style from "./NavBar.module.css";
const NavBar: FC = () => {
  return (
    <AppBar className={style["app-bar"]}>
      <p className={style["navbar-logo"]}>EH</p>
    </AppBar>
  );
};

export default NavBar;

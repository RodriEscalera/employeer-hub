import React, { FC } from "react";
import { Box } from "@mui/material";
import style from "./Layout.module.css";
import { LayoutProps } from "./Layout.types";

const Layout: FC<LayoutProps> = ({ className, children }) => {
  return <Box className={`${style["container"]} ${className}`}>{children}</Box>;
};

export default Layout;

import React, { FC } from "react";
import { Button } from "@mui/material";
import style from "./CustomButton.module.css";
import { CustomButtonProps } from "./CustomButton.types";

const CustomButton: FC<CustomButtonProps> = ({
  children,
  className,
  disabled,
  variant,
  type,
}) => {
  return (
    <Button
      type={type}
      variant={variant || "contained"}
      disabled={disabled}
      className={`${className} ${style["button"]}`}
    >
      {children}
    </Button>
  );
};

export default CustomButton;

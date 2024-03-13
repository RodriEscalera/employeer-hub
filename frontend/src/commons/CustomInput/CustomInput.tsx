import React, { FC, useState } from "react";
import style from "./CustomInput.module.css";

const CustomInput: FC<CustomInputProps> = ({
  value,
  required,
  onChange,
  className,
  name,
  type,
  isValid,
  placeholder,
}) => {
  return (
    <input
      required={required}
      value={value}
      onChange={onChange}
      className={`${className} ${isValid ? style["input-valid"] : style["input-invalid"]}`}
      name={name}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;

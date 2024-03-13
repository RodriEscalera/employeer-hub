"use client";
import React, { FC, useState } from "react";
import { Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import Layout from "@/commons/Layout/Layout";
import style from "./SingUp.module.css";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { InputsProps, InputsCollectionProps } from "./SingUp.types";
import { registerService } from "@/services/auth.service";
import CustomInput from "@/commons/CustomInput/CustomInput";

const Inputs: FC<InputsProps> = ({
  handleInputChange,
  inputsCollection,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className={style["inputs-container"]}>
      {Object.keys(inputsCollection).map((element: string, index: number) => (
        <Box key={index} className={style["input-box"]}>
          <label>{inputsCollection[element].label}</label>
          <CustomInput
            required={true}
            isValid={inputsCollection[element].isValid}
            value={inputsCollection[element].value}
            onChange={handleInputChange}
            className={style["input"]}
            name={inputsCollection[element].inputName}
            type={inputsCollection[element].type}
          />
          {!inputsCollection[element].isValid ? (
            <p className={style["helper-text"]}>
              {inputsCollection[element].errorMessage}
            </p>
          ) : null}
        </Box>
      ))}

      <CustomButton
        type="submit"
        className={style["button"]}
        variant="contained"
      >
        SIGN UP
      </CustomButton>
    </form>
  );
};

const SignUpView: FC = () => {
  const [inputsCollection, setInputsCollection] =
    useState<InputsCollectionProps>({
      firstname: {
        isValid: true,
        value: "",
        type: "text",
        inputName: "firstname",
        label: "Firstname",
        regex: /^.{5,15}$/,
        errorMessage:
          "Firstname field should have at least 5 characters and maximun 15.",
      },
      lastname: {
        isValid: true,
        value: "",
        type: "text",
        inputName: "lastname",
        label: "Lastname",
        regex: /^.{5,15}$/,
        errorMessage:
          "Lastname field should have at least 5 characters and maximun 15.",
      },
      email: {
        isValid: true,
        value: "",
        type: "text",
        inputName: "email",
        label: "Email",
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: "Invalid email.",
      },
      dni: {
        isValid: true,
        value: "",
        type: "number",
        inputName: "dni",
        label: "DNI",
        regex: /^.{8}$/,
        errorMessage: "Not a valid DNI.",
      },
      phone: {
        isValid: true,
        value: "",
        type: "number",
        inputName: "phone",
        label: "Phone",
        regex: /^.{10}$/,
        errorMessage: "Not a valid phone.",
      },
      password: {
        isValid: true,
        value: "",
        type: "password",
        inputName: "password",
        label: "Password",
        regex: /^(?=.*\d)(?=.*[A-Z]).{8,16}$/,
        errorMessage:
          "Password must contains at least 8 characters and max 16, lowercase and uppercase letters.",
      },
    });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsCollection((prevState: InputsCollectionProps) => {
      const inputName = e.target.name;
      return {
        ...prevState,
        [inputName]: { ...prevState[inputName], value: e.target.value },
      };
    });

    if (!inputsCollection[e.target.name].regex.test(e.target.value)) {
      setInputsCollection((prevState: InputsCollectionProps) => {
        const inputName = e.target.name;
        return {
          ...prevState,
          [inputName]: { ...prevState[inputName], isValid: false },
        };
      });
    } else {
      setInputsCollection((prevState: InputsCollectionProps) => {
        const inputName = e.target.name;
        return {
          ...prevState,
          [inputName]: { ...prevState[inputName], isValid: true },
        };
      });
    }
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const hasInvalidInput = Object.values(inputsCollection).some(
      (input) => !input.isValid
    );
    if (hasInvalidInput) {
      return;
    }
    try {
      await registerService({
        firstname: inputsCollection.firstname.value,
        lastname: inputsCollection.lastname.value,
        dni: inputsCollection.dni.value,
        phone: inputsCollection.phone.value,
        email: inputsCollection.email.value,
        password: inputsCollection.firstname.value,
      });
      toast.success("¡Sign up successfully!", { position: "top-right" });
    } catch (error) {
      toast.error("Couldn't sign up.", { position: "top-right" });
    }
  };

  return (
    <>
      <ToastContainer />
      <Layout className={style["layout"]}>
        <Box className={style["container"]}>
          <Box className={style["container-title"]}>
            <h2 className={style["title-text"]}>SIGN UP</h2>
          </Box>
          <Inputs
            onSubmit={onSubmit}
            inputsCollection={inputsCollection}
            handleInputChange={handleInputChange}
          />
        </Box>
      </Layout>
    </>
  );
};

export default SignUpView;

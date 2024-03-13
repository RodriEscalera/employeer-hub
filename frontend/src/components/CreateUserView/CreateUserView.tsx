"use client";
import React, { FC, useState } from "react";
import { Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import Layout from "@/commons/Layout/Layout";
import style from "./CreateUserView.module.css";
import CustomButton from "@/commons/CustomButton/CustomButton";
import {
  InputsPropsCreateUser,
  InputsCollectionPropsCreateUser,
} from "./CreateUserView.types";
import { registerService } from "@/services/auth.service";
import CustomInput from "@/commons/CustomInput/CustomInput";
import { useRouter } from "next/navigation";
import { createUser } from "@/services/user.service";

const Inputs: FC<InputsPropsCreateUser> = ({
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
        CREATE USER
      </CustomButton>
    </form>
  );
};

const CreateUserView: FC = () => {
  const router = useRouter();
  const [inputsCollection, setInputsCollection] =
    useState<InputsCollectionPropsCreateUser>({
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
        errorMessage: "The DNI number must be at least 8 characters long.",
      },
      phone: {
        isValid: true,
        value: "",
        type: "number",
        inputName: "phone",
        label: "Phone",
        regex: /^.{10}$/,
        errorMessage: "The phone number must be at least 10 characters long.",
      },
      password: {
        isValid: true,
        value: "",
        type: "password",
        inputName: "password",
        label: "Password",
        regex: /^(?=.*\d)(?=.*[A-Z]).{8,16}$/,
        errorMessage:
          "the password must have at least 8 characters and a maximum of 16. It must have lowercase letters, uppercase letters and numbers.",
      },
    });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsCollection((prevState: InputsCollectionPropsCreateUser) => {
      const inputName = e.target.name;
      return {
        ...prevState,
        [inputName]: { ...prevState[inputName], value: e.target.value },
      };
    });

    if (!inputsCollection[e.target.name].regex.test(e.target.value)) {
      setInputsCollection((prevState: InputsCollectionPropsCreateUser) => {
        const inputName = e.target.name;
        return {
          ...prevState,
          [inputName]: { ...prevState[inputName], isValid: false },
        };
      });
    } else {
      setInputsCollection((prevState: InputsCollectionPropsCreateUser) => {
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
      await createUser({
        firstname: inputsCollection.firstname.value,
        lastname: inputsCollection.lastname.value,
        dni: inputsCollection.dni.value,
        phone: inputsCollection.phone.value,
        email: inputsCollection.email.value,
        password: inputsCollection.password.value,
      });
      toast.success("¡User created successfully!", { position: "top-right" });
    } catch (error) {
      toast.error("Couldn't create user.", { position: "top-right" });
    }
  };

  return (
    <>
      <ToastContainer />
      <Layout className={style["layout"]}>
        <Box className={style["container"]}>
          <Box className={style["container-title"]}>
            <h2 className={style["title-text"]}>CREATE USER</h2>
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

export default CreateUserView;

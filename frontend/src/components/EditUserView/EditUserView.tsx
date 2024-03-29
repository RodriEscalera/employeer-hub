"use client";
import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import Layout from "@/commons/Layout/Layout";
import style from "./EditUserView.module.css";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { ToastContainer, toast } from "react-toastify";
import {
  InputsCollectionPropsEditUser,
  InputsPropsEditUser,
} from "./EditUserView.types";
import { useRouter } from "next/navigation";
import { getOneUser, updateUser } from "@/services/user.service";
import { useParams } from "next/navigation";

const Inputs: FC<InputsPropsEditUser> = ({
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
        EDIT
      </CustomButton>
    </form>
  );
};

const EditUserView: FC = () => {
  const router = useRouter();
  const params = useParams<{ [key: string]: string }>();

  const findUser = async (): Promise<void> => {
    if (params._id) {
      const response = await getOneUser(params._id);
      const userData = response[0];

      setInputsCollection((prevState: InputsCollectionPropsEditUser) => {
        return {
          ...prevState,
          firstname: {
            ...prevState.firstname,
            value: userData.firstname,
          },
        };
      });
      setInputsCollection((prevState: InputsCollectionPropsEditUser) => {
        return {
          ...prevState,
          lastname: {
            ...prevState.lastname,
            value: userData.lastname,
          },
        };
      });
      setInputsCollection((prevState: InputsCollectionPropsEditUser) => {
        return {
          ...prevState,
          email: {
            ...prevState.email,
            value: userData.email,
          },
        };
      });
      setInputsCollection((prevState: InputsCollectionPropsEditUser) => {
        return {
          ...prevState,
          dni: {
            ...prevState.dni,
            value: userData.dni,
          },
        };
      });
      setInputsCollection((prevState: InputsCollectionPropsEditUser) => {
        return {
          ...prevState,
          phone: {
            ...prevState.phone,
            value: userData.phone,
          },
        };
      });
    }
  };
  useEffect(() => {
    findUser();
  }, []);
  const [inputsCollection, setInputsCollection] =
    useState<InputsCollectionPropsEditUser>({
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
    });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsCollection((prevState: InputsCollectionPropsEditUser) => {
      const inputName = e.target.name;
      return {
        ...prevState,
        [inputName]: { ...prevState[inputName], value: e.target.value },
      };
    });

    if (!inputsCollection[e.target.name].regex.test(e.target.value)) {
      setInputsCollection((prevState: InputsCollectionPropsEditUser) => {
        const inputName = e.target.name;
        return {
          ...prevState,
          [inputName]: { ...prevState[inputName], isValid: false },
        };
      });
    } else {
      setInputsCollection((prevState: InputsCollectionPropsEditUser) => {
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
      console.log(inputsCollection.firstname.value);
      const result = await updateUser(params._id, {
        firstname: inputsCollection.firstname.value,
        lastname: inputsCollection.lastname.value,
        dni: inputsCollection.dni.value,
        phone: inputsCollection.phone.value,
        email: inputsCollection.email.value,
      });
      console.log("result");
      toast.success("¡Edited successfully!", { position: "top-right" });
    } catch (error) {
      console.log(error);
      toast.error("Couldn't edit.", { position: "top-right" });
    }
  };

  return (
    <>
      <ToastContainer />
      <Layout className={style["layout"]}>
        <Box className={style["container"]}>
          <Box className={style["container-title"]}>
            <h2 className={style["title-text"]}>EDIT USER</h2>
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

export default EditUserView;

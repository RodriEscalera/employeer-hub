"use client";
import { Box } from "@mui/material";
import React, { FC, useState } from "react";
import style from "./LoginView.module.css";
import { InputsCollectionProps, InputsProps } from "./LoginView.types";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { ToastContainer, toast } from "react-toastify";
import Layout from "@/commons/Layout/Layout";
import { loginService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { setUser } from "@/state/user/userSlice";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "@/state/dispatch-useSelector";
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
        </Box>
      ))}

      <CustomButton
        type="submit"
        className={style["button"]}
        variant="contained"
      >
        LOG IN
      </CustomButton>
    </form>
  );
};

const LoginView: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [inputsCollection, setInputsCollection] =
    useState<InputsCollectionProps>({
      email: {
        isValid: true,
        value: "",
        type: "text",
        inputName: "email",
        label: "Email",
      },

      password: {
        isValid: true,
        value: "",
        type: "password",
        inputName: "password",
        label: "Password",
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
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const userData = await loginService({
        email: inputsCollection.email.value,
        password: inputsCollection.password.value,
      });
      dispatch(setUser(userData));
      toast.success("¡Login successfully!", { position: "top-right" });
      router.push("/");
    } catch (error) {
      toast.error("Invalid Credentials.", { position: "top-right" });
    }
  };

  return (
    <>
      <ToastContainer />
      <Layout className={style["layout"]}>
        <Box className={style["container"]}>
          <Box className={style["container-title"]}>
            <h2 className={style["title-text"]}>LOG IN</h2>
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

export default LoginView;

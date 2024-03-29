"use client";
import React, { FC } from "react";
import { Box } from "@mui/material";
import style from "./HomeView.module.css";
import CustomButton from "@/commons/CustomButton/CustomButton";
import Link from "next/link";
import Layout from "@/commons/Layout/Layout";
import { useAppSelector } from "@/state/dispatch-useSelector";
import { RootState } from "@/state/main.reducer";
const HomeView: FC = () => {
  const user = useAppSelector((state: RootState) => state.user);

  return (
    <Layout className={style["layout"]}>
      <Box className={style["title-container"]}>
        <h1 className={style["title"]}>
          WELCOME TO <br />
          EMPLOYEER HUB
        </h1>
      </Box>
      {user._id.length > 0 ? (
        <>
          <Link href="/management">
            <CustomButton variant="outlined">LET'S MANAGE</CustomButton>
          </Link>
        </>
      ) : (
        <>
          <Box className={style["log-in-container"]}>
            <h3 className={style["log-in-text"]}>
              If you're already registered, just:
            </h3>
            <Link href="/login">
              <CustomButton variant="outlined">LOG IN</CustomButton>
            </Link>
          </Box>
          <Box className={style["log-in-container"]}>
            <h3 className={style["log-in-text"]}>
              Haven't an account yet? So:
            </h3>
            <Link href="/signup">
              <CustomButton variant="outlined">SIGN UP</CustomButton>
            </Link>
          </Box>
        </>
      )}
    </Layout>
  );
};

export default HomeView;

import React, { FC } from "react";
import AppBar from "@mui/material/AppBar";
import style from "./NavBar.module.css";
import Link from "next/link";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { useAppDispatch, useAppSelector } from "@/state/dispatch-useSelector";
import { setUser } from "@/state/user/userSlice";
import { Toolbar } from "@mui/material";
import { RootState } from "@/state/main.reducer";

const NavBar: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const handleLogout = (): void => {
    window.localStorage.removeItem("token");
    dispatch(
      setUser({
        _id: "",
        is_admin: false,
        firstname: "",
        lastname: "",
        email: "",
        dni: "",
        phone: "",
        password: "",
      })
    );
  };

  return (
    <AppBar className={style["app-bar"]}>
      <Toolbar className={style["tool-bar"]}>
        <Link className={style["link-app-bar"]} href={"/"}>
          <p className={style["navbar-logo"]}>EH</p>
        </Link>
        {user._id.length > 0 ? (
          <CustomButton onClick={handleLogout}>LOG OUT</CustomButton>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

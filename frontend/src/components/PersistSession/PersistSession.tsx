import React, { FC, useEffect } from "react";
import { useAppDispatch } from "@/state/dispatch-useSelector";
import { meService } from "@/services/auth.service";
import { setUser } from "@/state/user/userSlice";
import { PersistSessionProps } from "./PersistSession.types";

const PersistSession: FC<PersistSessionProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const getUserData = async () => {
    try {
      const userData = await meService();
      dispatch(setUser(userData));
    } catch (error) {
      console.error("Couldn't get user data.", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return <>{children}</>;
};

export default PersistSession;

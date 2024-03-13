import { UserProps } from "@/types";
import { Slice, createSlice } from "@reduxjs/toolkit";

const initialState: UserProps = {
  _id: "",
  is_admin: false,
  firstname: "",
  lastname: "",
  email: "",
  dni: "",
  phone: "",
  password: "",
};

const userSlice: Slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

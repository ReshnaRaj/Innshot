
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  token: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminDetails: (state, action) => {
      state.email = action.payload.email;
      // state.token = action.payload.token;
    },
    adminlogin:(state,action)=>{
      // console.log(action.payload,"1234567")
      state.value={...action.payload,
      isAdminAuth:true}
      // console.log(state.value,"valuess")
      
    },
    adminlogout:(state)=>{
      state.value={isAdminAuth:false,
      admin:null}
    }
  },
});

export const { setAdminDetails,adminlogin,adminlogout } = adminSlice.actions;
export default adminSlice.reducer;
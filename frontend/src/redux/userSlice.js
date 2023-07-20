import {createSlice} from '@reduxjs/toolkit'
const initialState={
    id:'',
    name:'',
    email:'',
    phone:'',
    // token:''

}
 
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserDetails:(state,action)=>{
            state.id=action.payload._id;
            state.name=action.payload.name;
            state.email=action.payload.email;
            state.phone=action.payload.phone;
            // state.token=action.payload.token;
        },
        userlogin:(state,action)=>{
           
            state.value={...action.payload,
            isUserAuth:true}
        },
        userlogout:(state)=>{
            state.value={
                isUserAuth:false,
                user:null
            }
        }
    
    }
})
export const {setUserDetails,userlogin,userlogout}=userSlice.actions;
export default userSlice.reducer;


import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_PATH = import.meta.env.VITE_API_PATH;

//#region
//#endregion

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        loginState:false,
    },
    reducers: {
        loginStateUpLoad: (state, action) => {
            state.loginState = action.payload;
        },
    },
});

export const { loginStateUpLoad } = authSlice.actions;

//#region 測試連線
    //測試連線
    // export const linkTest = createAsyncThunk(
    //     "login/linkTest",
    //     async (_,{ dispatch }) => {
    //         try {
    //             const response = await axiosWithCookie.get(`${BASE_URL}/test-db`);
    //             console.log("連線成功",response.data);
    //             return(response.data);
    //         } catch (error) {
    //             console.log("連線失敗",error.response.data);
    //             return(error.response.data);
    //         }
    //     }
    // );
    //測試連線
//#endregion

//#region 會員登入API
export const loginUser = createAsyncThunk(
    "login/loginUser",
    async (account, { dispatch, rejectWithValue }) => {
        try {
            const handleLoginRef = await axios.post(`${BASE_URL}/auth/login`, account);
            console.log("登入成功",handleLoginRef.data);

            //取出token並取名為tokenData
            const tokenData = handleLoginRef.data.token;
            //取出token並取名為tokenData

            //如果tokenData存在則存入 localStorage並取名為token
            if (tokenData) {
                //console.log("token存入成功");
                localStorage.setItem("token", tokenData);
            }

            dispatch(loginStateUpLoad(false));
            return({
                login:handleLoginRef.data,
            });
        } catch (error) {
            console.log("登入失敗",error.response.data);
            dispatch(loginStateUpLoad(false));
            return rejectWithValue(error.response.data);
        }
    }
);
//#endregion

//#region 登入確認 
export const checkLogin = createAsyncThunk(
    "login/checkLogin",
    async (_,{ dispatch }) => {
        try {
            const checkLoginRef = await axios.post(`${BASE_URL}/auth/logInCheck`);
            console.log("登入確認成功",checkLoginRef.data);
            dispatch(loginStateUpLoad(true));
        } catch (error) {
            console.log("登入確認失敗",error.response.data);
            dispatch(loginStateUpLoad(false));
        }
    }
);
//#endregion

//#region 登出api
export const logout = createAsyncThunk(
    "autj/logout",
    async (_,{ dispatch }) => {
        try {
            //請求格式 網址 附帶檔案 標頭檔
            const logoutRef = await axios.post(`${BASE_URL}/auth/logout`);
            console.log("登出成功",logoutRef.data);
            // 清除 token
            localStorage.removeItem('token');
            dispatch(loginStateUpLoad(false));
        } catch (error) {
            console.log("登出失敗",error.response.data);
            dispatch(loginStateUpLoad(false));
        }
    }
);
//#endregion



    
        
export default authSlice.reducer;
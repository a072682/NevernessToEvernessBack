

import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_PATH = import.meta.env.VITE_API_PATH;

//#region
//#endregion

export const reservationSlice = createSlice({
    name: "reservation",
    initialState: {
        allReservationData:[],
    },
    reducers: {
        allReservationDataUpLoad: (state, action) => {
            state.allReservationData = action.payload;
        },
    },
});

export const { allReservationDataUpLoad, } = reservationSlice.actions;

//#region 取得全部預約資料 
export const getAllReservationData = createAsyncThunk(
    "reservation/checkLogin",
    async (_,{ dispatch }) => {
        try {
            const getAllReservationDataRef = await axios.get(`${BASE_URL}/reservation/getAllData`);
            console.log("取得全部預約資料成功",getAllReservationDataRef.data);
            dispatch(allReservationDataUpLoad(getAllReservationDataRef.data.data));
        } catch (error) {
            console.log("取得全部預約資料失敗",error.response.data);
        }
    }
);
//#endregion

        
export default reservationSlice.reducer;
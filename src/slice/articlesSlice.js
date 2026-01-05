

import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_PATH = import.meta.env.VITE_API_PATH;

//#region
//#endregion

export const articlesSlice = createSlice({
    name: "articles",
    initialState: {
        
    },
    reducers: {
        
    },
});

export const {  } = articlesSlice.actions;

//#region 取得全部文章資料 
export const getAllArticlesData = createAsyncThunk(
    "articles/getAllArticlesData",
    async (_,{ dispatch, rejectWithValue }) => {
        try {
            const getAllArticlesDataRef = await axios.get(`${BASE_URL}/articles/getAllArticles`);
            console.log("取得全部文章資料成功",getAllArticlesDataRef.data);
            return getAllArticlesDataRef.data.articles;
        } catch (error) {
            console.log("取得全部文章資料失敗",error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
//#endregion

//#region 取得單一文章資料 
export const getSingleArticlesData = createAsyncThunk(
    "articles/getSingleArticlesData",
    async (id,{ dispatch, rejectWithValue }) => {
        try {
            const getSingleArticlesDataRef = await axios.get(`${BASE_URL}/articles/getSingleArticle/${id}`);
            console.log("取得單一文章資料成功",getSingleArticlesDataRef.data);
            return getSingleArticlesDataRef.data;
        } catch (error) {
            console.log("取得單一文章資料失敗",error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
//#endregion

//#region 上傳文章資料 
export const articlesUpData = createAsyncThunk(
    "articles/articlesUpData",
    async (articleData,{ dispatch, rejectWithValue }) => {
        try {
            const articlesUpDataRef = await axios.post(`${BASE_URL}/articles/articleDataUpLoad`,articleData);
            console.log("上傳文章成功",articlesUpDataRef.data);
            return articlesUpDataRef.data;
        } catch (error) {
            console.log("上傳文章失敗",error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
//#endregion

//#region 修改文章資料 
export const articlesChangeData = createAsyncThunk(
    "articles/articlesChangeData",
    async ({id,articleData},{ dispatch, rejectWithValue }) => {
        try {
            const articlesChangeDataRef = await axios.put(`${BASE_URL}/articles/updateArticle/${id}`,articleData);
            console.log("修改文章成功",articlesChangeDataRef.data);
            return articlesChangeDataRef.data;
        } catch (error) {
            console.log("修改文章失敗",error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
//#endregion

//#region 刪除文章資料 
export const articlesDeleteData = createAsyncThunk(
    "articles/articlesDeleteData",
    async (id,{ dispatch,rejectWithValue }) => {
        try {
            const articlesDeleteDataRef = await axios.delete(`${BASE_URL}/articles/deleteArticle/${id}`);
            console.log("刪除文章成功",articlesDeleteDataRef.data);
            dispatch(getAllArticlesData());
            return articlesDeleteDataRef.data;
        } catch (error) {
            console.log("刪除文章失敗",error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
//#endregion

        
export default articlesSlice.reducer;
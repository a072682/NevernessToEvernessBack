import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slice/modalSlice";
import authReducer from "./slice/authSlice";
import articlesReducer from "./slice/articlesSlice";
import reservationReducer from "./slice/reservationSlice";


export const store = configureStore({
    reducer: { // 必要加入 reducer
      auth: authReducer,
      modal: modalReducer,
      articles: articlesReducer,
      reservation: reservationReducer,
      //counter為元件的名稱，可更改 
      //counterReducer為引入的元件改名後的名稱不可更改
    }
  });

export default store;
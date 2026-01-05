import { createSlice } from "@reduxjs/toolkit";

//#region
//#endregion
//#region 方便之後表達更語意化像是open(MODALS.LOGIN) 比 open("login") 更清楚
    export const MODALS = {
        TESTMODAL: "testModal",
        TESTMODAL02: "testModal02",
    };
//#endregion

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        activeModal: null,
    },
    reducers: {
        open: (state, action) => {
            const name = action.payload;
            //如果不是字串就回null
            state.activeModal = typeof name === "string" ? name : null;
        },
        close: (state) => {
            state.activeModal = null;
        },
        switchTo: (state, action) => {
            const name = action.payload;
            //如果不是字串就回null
            state.activeModal = typeof name === "string" ? name : null;
        },
    },
  });


  export const { open, close, switchTo } = modalSlice.actions;

    //#region
    //#endregion

    // 檢查指定名稱的 modal 是否有開啟
        export const isModalOpen = (state, name) =>{
            return(
                state.modal.activeModal === name
            );
        }
    //#endregion
        
export default modalSlice.reducer;
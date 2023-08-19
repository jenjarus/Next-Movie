import { configureStore } from "@reduxjs/toolkit";
import viewedReducer from "./viewed";
import favoriteSlice from "./favorite";
import { getCookie, setCookie } from "../utils/cookie";
import { TypeIdsReducers } from "../utils/types";

const store = configureStore({
  reducer: {
    viewed: viewedReducer,
    favorite: favoriteSlice,
  },
  preloadedState: {
    viewed: getCookie<TypeIdsReducers>("favorite"),
    favorite: getCookie<TypeIdsReducers>("favorite"),
  },
});

store.subscribe(() => {
  setCookie("favorite", store.getState().favorite);
});
store.subscribe(() => {
  setCookie("viewed", store.getState().viewed);
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

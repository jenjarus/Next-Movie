import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeIdsReducers } from "../utils/types";

const initialState: TypeIdsReducers = {
  items: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setFavoriteId: (state: TypeIdsReducers, action: PayloadAction<number>) => {
      const newItems: number[] =
        state.items.length && state.items.find((id) => id === action.payload)
          ? state.items
          : [...state.items, action.payload];
      state.items = newItems;
    },
    deleteFavoriteId: (state: TypeIdsReducers, action: PayloadAction<number>) => {
      state.items = [...state.items.filter((item) => item !== action.payload)];
    },
  },
});

export const { setFavoriteId, deleteFavoriteId } = favoriteSlice.actions;

export default favoriteSlice.reducer;

/*export default function favorite(state = initialState, action) {
  switch (action.type) {
    case "SET_ID_FAVORITE":
      const newItems: number[] =
        state.items.length && state.items.find((id) => id === action.id)
          ? state.items
          : [...state.items, action.id];
      return {
        ...state,
        items: newItems,
      };
    case "DELETE_ID_FAVORITE":
      return {
        ...state,
        items: [...state.items.filter((item) => item !== action.id)],
      };
    default:
      return state;
  }
}*/

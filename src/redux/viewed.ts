import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeIdsReducers } from "../utils/types";

const COUNT_VIEWED_ITEMS: number = 5; //TODO потом сделать 10
const initialState: TypeIdsReducers = {
  items: [],
};

export const viewedSlice = createSlice({
  name: "viewed",
  initialState,
  reducers: {
    setViewedId: (state: TypeIdsReducers, action: PayloadAction<number>) => {
      const newItems: number[] =
        state.items.length && state.items.find((id) => id === action.payload)
          ? [action.payload, ...state.items.filter((id) => id !== action.payload)]
          : [action.payload, ...state.items];
      state.items = newItems.slice(0, COUNT_VIEWED_ITEMS);
    },
  },
});

export const { setViewedId } = viewedSlice.actions;

export default viewedSlice.reducer;

/*export default function viewed(state = initalState, action) {
  switch (action.type) {
    case "SET_ID_VIEWED":
      const newItems: number[] =
        state.items.length && state.items.find((id) => id === action.id)
          ? [action.id, ...state.items.filter((id) => id !== action.id)]
          : [action.id, ...state.items];
      return {
        ...state,
        items: newItems.slice(0, COUNT_VIEWED_ITEMS),
      };
    default:
      return state;
  }
}*/

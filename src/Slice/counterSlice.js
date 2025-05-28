import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countMines: 1,
  totalMoves: "",
  totalProfit: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setMinesAction: (state, action) => {
      state.countMines = action?.payload;
    },
    countMovesAction: (state, action) => {
      state.totalMoves = action?.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMinesAction, countMovesAction } = counterSlice.actions;

export default counterSlice.reducer;

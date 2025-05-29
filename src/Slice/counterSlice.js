import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countMines: 1,
  totalMoves: "",
  totalProfit: "",
  start: false,
  value: 0,
  totalScore: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    startGameAction: (state, action) => {
      state.start = action?.payload;
    },

    autoPlayAction: (state, action) => {
      state.value += action.payload;
    },

    totalScoreAction: (state, action) => {
      state.totalScore = action.payload;
    },

    setMinesAction: (state, action) => {
      state.countMines = action?.payload;
    },
    countMovesAction: (state, action) => {
      state.totalMoves = action?.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMinesAction,
  startGameAction,
  autoPlayAction,
  totalScoreAction,
  countMovesAction,
} = counterSlice.actions;

export default counterSlice.reducer;

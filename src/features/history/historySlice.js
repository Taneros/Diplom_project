import {
  createSlice
} from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: 'history',
  initialState: {
    items: [],
  },
  reducers: {
    addHistoryItem(state, action) {
      state.items.push(action.payload);
    },
    clearHistory(state) {
      state.items = [];
    },
  },
});

export const {
  addHistoryItem,
  clearHistory
} = historySlice.actions;

export default historySlice.reducer;
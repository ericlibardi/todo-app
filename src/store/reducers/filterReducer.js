import { createSlice } from "@reduxjs/toolkit";

export const filterOptions = ["allTasks", "completed", "pending"];
export const orderOptions = ["noOrder", "recent", "oldest"];

const initialState = {
  filter: filterOptions[0],
  order: orderOptions[0],
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // Define the current filter for the Tasks -- if should be visible only completed, pending or all Tasks
    filterTasks: (state, action) => {
      state.filter = filterOptions[action.payload];
    },
    orderTasks: (state, action) => {
      state.order = orderOptions[action.payload];
    },
  },
});

export const { filterTasks, orderTasks } = filterSlice.actions;

export default filterSlice.reducer;

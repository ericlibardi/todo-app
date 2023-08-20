import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasksList: [
    {
      id: "fds23",
      description: `First task for the app`,
      due: new Date("10-23-2023"),
      completed: false,
    },
    {
      id: "fht93",
      description: "Second task for the app",
      due: new Date("11-09-2023"),
      completed: true,
    },
    {
      id: "fgfd3",
      description: "Third task for the app",
      due: new Date("12-14-2023"),
      completed: false,
    },
  ],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {},
    editTask: (state, action) => {},
    deleteTask: (state, action) => {},
    changeCompletionState: (state, action) => {},
  },
});

export const { addTask, editTask, deleteTask, changeCompletionState } =
  tasksSlice.actions;

export default tasksSlice.reducer;

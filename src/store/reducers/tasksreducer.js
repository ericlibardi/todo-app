import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasksList: [
    {
      id: "fds23",
      description: `First task for the app`,
      due: "2023-10-23",
      completed: false,
    },
    {
      id: "fht93",
      description: "Second task for the app",
      due: "2023-11-09",
      completed: true,
    },
    {
      id: "fgfd3",
      description: "Third task for the app",
      due: "2023-12-14",
      completed: false,
    },
  ],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasksList.push(action.payload);
    },
    editTask: (state, action) => {
      const taskId = action.payload.id;

      const taskIndex = state.tasksList.findIndex((task) => task.id === taskId);

      state.tasksList[taskIndex] = {
        ...action.payload,
        id: taskId,
      };
    },
    deleteTask: (state, action) => {
      const taskIndex = state.tasksList.findIndex(
        (task) => task.id === action.payload
      );

      state.tasksList.splice(taskIndex, 1);
    },
    toogleCompletionState: (state, action) => {
      const taskIndex = state.tasksList.findIndex(
        (task) => task.id === action.payload
      );

      state.tasksList[taskIndex].completed =
        !state.tasksList[taskIndex].completed;
    },
  },
});

export const { addTask, editTask, deleteTask, toogleCompletionState } =
  tasksSlice.actions;

export default tasksSlice.reducer;

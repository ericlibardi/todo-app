import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasksList: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Add new Task into the list
    addTask: (state, action) => {
      state.tasksList.push(action.payload);
    },
    initializeTasks: (state, action) => {
      state.tasksList = [...action.payload];
    },
    // Change task edited by user
    editTask: (state, action) => {
      const taskId = action.payload.id;

      const taskIndex = state.tasksList.findIndex((task) => task.id === taskId);

      state.tasksList[taskIndex] = {
        ...action.payload,
        id: taskId,
      };
    },
    // Delete the task interacted by the user
    deleteTask: (state, action) => {
      if (state.tasksList.length === 1) {
        state.tasksList = [];
        return;
      }

      const taskIndex = state.tasksList.findIndex(
        (task) => task.id === action.payload
      );

      state.tasksList.splice(taskIndex, 1);
    },
    // Change current status of completion of the task
    toogleCompletionState: (state, action) => {
      const taskIndex = state.tasksList.findIndex(
        (task) => task.id === action.payload
      );

      state.tasksList[taskIndex].completed =
        !state.tasksList[taskIndex].completed;
    },
  },
});

export const {
  addTask,
  initializeTasks,
  editTask,
  deleteTask,
  toogleCompletionState,
} = tasksSlice.actions;

export default tasksSlice.reducer;

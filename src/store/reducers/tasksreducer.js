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
    // Add new Task into the list
    addTask: (state, action) => {
      state.tasksList.push(action.payload);
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

export const { addTask, editTask, deleteTask, toogleCompletionState } =
  tasksSlice.actions;

export default tasksSlice.reducer;

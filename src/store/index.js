import { configureStore } from "@reduxjs/toolkit";
import tasksreducer from "./reducers/tasksreducer";

export const store = configureStore({
  reducer: { tasks: tasksreducer },
});

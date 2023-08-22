import { configureStore } from "@reduxjs/toolkit";
import tasksreducer from "./reducers/tasksreducer";
import filterReducer from "./reducers/filterReducer";

export const store = configureStore({
  reducer: { tasks: tasksreducer, filters: filterReducer },
});

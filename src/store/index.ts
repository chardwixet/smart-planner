import { configureStore } from "@reduxjs/toolkit";
import taskReduser from "./slices/taskSlices";
import boardReduser from "./slices/boardSlices";

export const store = configureStore({
  reducer: { tasks: taskReduser, boards: boardReduser },
});

export type RootState = ReturnType<typeof store.getState>;

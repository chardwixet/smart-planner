import { configureStore } from "@reduxjs/toolkit";
import taskReduser from "./slices/taskSlices";

export const store = configureStore({
  reducer: { tasks: taskReduser },
});

export type RootState = ReturnType<typeof store.getState>;

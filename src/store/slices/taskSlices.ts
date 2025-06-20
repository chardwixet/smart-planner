import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type Tasks = Task[];

const initialState: Tasks = [];

const taskSlices = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<string>) {
      state.push({
        id: crypto.randomUUID(),
        title: action.payload,
        completed: false,
      });
    },
    // updateTitle(state, action) {
    //   state.title = action.payload.title;
    // },
    // changeComplete(state) {
    //   state.completed = !state.completed;
    // },
    // removeTask(state) {
    //   state.id = "";
    //   state.title = "";
    //   state.completed = false;
    // },
  },
});

export const { addTask } = taskSlices.actions;

export default taskSlices.reducer;

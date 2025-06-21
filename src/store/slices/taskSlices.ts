import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Task = {
  id: string;
  title: string;
  status: boolean;
};

export type Tasks = {
  tasks: Task[];
};

const savedTasks = localStorage.getItem("tasks");

const initialState: Tasks = {
  tasks: savedTasks ? JSON.parse(savedTasks) : [],
};

const taskSlices = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<string>) {
      state.tasks.push({
        id: crypto.randomUUID(),
        title: action.payload,
        status: false,
      });

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    changeTitle(state, action: PayloadAction<{ id: string; title: string }>) {
      const task = state.tasks.find((item) => item.id === action.payload.id);

      if (task) {
        task.title = action.payload.title;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    changeStatus(state, action: PayloadAction<string>) {
      const task = state.tasks.find((item) => item.id === action.payload);

      if (task) {
        task.status = !task.status;
      }

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    removeTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, changeStatus, changeTitle, removeTask } =
  taskSlices.actions;

export default taskSlices.reducer;

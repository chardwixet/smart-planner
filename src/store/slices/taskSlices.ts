import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";

export type Task = {
  id: string;
  idBoard: string;
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
    addTask(state, action: PayloadAction<{ idBoard: string; title: string }>) {
      state.tasks.push({
        id: crypto.randomUUID(),
        idBoard: action.payload.idBoard,
        title: action.payload.title,
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
    moveTask(
      state,
      action: PayloadAction<{
        currentId: string;
        dropId: string;
        idBoard: string;
      }>
    ) {
      const currentId = state.tasks.findIndex(
        (item) => item.id === action.payload.currentId
      );
      const dropId = state.tasks.findIndex(
        (item) => item.id === action.payload.dropId
      );

      const idBoard = action.payload.idBoard;

      if (currentId === -1 || currentId === dropId) {
        console.log("вышел ничего не сделав");
        return;
      }

      const task = state.tasks.find(
        (item) => item.id === action.payload.currentId
      );

      state.tasks.splice(currentId, 1);

      if (dropId !== -1) {
        const adjustedDropIndex = currentId < dropId ? dropId - 1 : dropId;

        if (task) {
          state.tasks.splice(adjustedDropIndex + 1, 0, task);

          if (task.idBoard !== idBoard) task.idBoard = idBoard;
        }
      } else {
        if (task) {
          task.idBoard = idBoard;
          state.tasks.push(task);
        }
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

export const { addTask, changeStatus, moveTask, changeTitle, removeTask } =
  taskSlices.actions;

export default taskSlices.reducer;

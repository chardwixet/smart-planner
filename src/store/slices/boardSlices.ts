import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Board = {
  id: string;
  title: string;
};

export type Boards = {
  lists: Board[];
};

const savedList = localStorage.getItem("lists");

const initialState: Boards = {
  lists: savedList ? JSON.parse(savedList) : [],
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addList(state, action: PayloadAction<string>) {
      state.lists.push({ id: crypto.randomUUID(), title: action.payload });

      localStorage.setItem("lists", JSON.stringify(state.lists));
    },
    removeList(state, action: PayloadAction<string>) {
      state.lists = state.lists.filter((item) => item.id !== action.payload);

      localStorage.setItem("lists", JSON.stringify(state.lists));
    },
  },
});

export const { addList, removeList } = listSlice.actions;

export default listSlice.reducer;

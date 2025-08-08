import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addList } from "../../../store/slices/boardSlices";

type Props = {};

export function Sidebar({}: Props) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  function add(e) {
    e.preventDefault();
    if (inputValue) {
      dispatch(addList(inputValue));
    }

    setInputValue("");
  }

  return (
    <form onSubmit={add}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Добавить список</button>
    </form>
  );
}

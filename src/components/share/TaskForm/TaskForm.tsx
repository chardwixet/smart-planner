import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTask } from "@store/slices/taskSlices";

interface Props {
  className?: string;
  idBoard: string;
}

export function TaskForm({ className, idBoard }: Props) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  function taskAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputValue) {
      dispatch(addTask({ title: inputValue, idBoard }));
    }
  }

  return (
    <form onSubmit={taskAdd} className={className}>
      <input type="text" onChange={(e) => setInputValue(e.target.value)} />
      <button type="submit">Добавить</button>
    </form>
  );
}

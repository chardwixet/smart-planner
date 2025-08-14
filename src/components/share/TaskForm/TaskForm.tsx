import { useDispatch } from "react-redux";
import { Input } from "../../ui/Input";
import { addTask } from "../../../store/slices/taskSlices";
import { useState } from "react";

interface Props {
  className?: string;
  idBoard: string;
}

export function TaskForm({ className, idBoard }: Props) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  function taskAdd(e) {
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

import { useDispatch } from "react-redux";
import {
  changeStatus,
  changeTitle,
  removeTask,
  type Task,
} from "../../../store/slices/taskSlices";
import { useState } from "react";

interface Props {
  task: Task;
}

export function TaskItem({ task }: Props) {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState(task.title);

  function saveTask(title: string) {
    dispatch(changeTitle({ id: task.id, title: title }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleBlur(e: React.ChangeEvent<HTMLInputElement>) {
    saveTask(e.currentTarget.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setInputValue(task.title); // Очищаем input
    }

    if (e.key === "Enter") {
      saveTask(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }

  return (
    <div>
      <input
        type="checkbox"
        defaultChecked={task.status}
        onChange={() => dispatch(changeStatus(task.id))}
      />
      <input
        type={"text"}
        value={inputValue}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => dispatch(removeTask(task.id))}>удалить</button>
    </div>
  );
}

import { useDispatch } from "react-redux";
import {
  changeStatus,
  changeTitle,
  removeTask,
  type Task,
} from "../../../store/slices/taskSlices";

import styles from "./TaskItem.module.scss";
import { useEffect, useRef, useState } from "react";

interface Props {
  task: Task;
}

export function TaskItem({ task }: Props) {
  const [isEditing, setisEditing] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div className={styles.task}>
      <input
        type="checkbox"
        defaultChecked={task.status}
        onChange={() => dispatch(changeStatus(task.id))}
      />
      {!isEditing ? (
        <span className={styles.input} onClick={() => setisEditing(true)}>
          {task.title}
        </span>
      ) : (
        <input
          ref={inputRef}
          type="text"
          onBlur={(e) => {
            setisEditing(false);
            dispatch(changeTitle({ id: task.id, title: e.target.value }));
          }}
          defaultValue={task.title}
          className={styles.input}
        />
      )}

      <button onClick={() => dispatch(removeTask(task.id))}>удалить</button>
    </div>
  );
}

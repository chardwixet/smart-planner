import { useDispatch } from "react-redux";
import {
  changeStatus,
  changeTitle,
  removeTask,
  type Task,
} from "../../../store/slices/taskSlices";
import styles from "./TaskItem.module.scss";
import { useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
  });

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  //   opacity: isDragging ? 0.5 : 1,
  //   display: isDragging ? "none" : "flex",
  //   cursor: isDragging ? "grabbing" : "grab",
  // };

  return (
    <div
      className={styles.task}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      data-isDragging={isDragging}
    >
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
            e.stopPropagation();
            dispatch(changeTitle({ id: task.id, title: e.target.value }));
          }}
          defaultValue={task.title}
          className={styles.input}
        />
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log("происходит нажатие");
          dispatch(removeTask(task.id));
        }}
      >
        удалить
      </button>
    </div>
  );
}

import { useDispatch } from "react-redux";
import {
  changeStatus,
  changeTitle,
  removeTask,
  type Task,
} from "../../../store/slices/taskSlices";
import { useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import TrashIcon from "@/assets/svg/trash.svg?react";
import style from "./TaskItem.module.scss";

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
      type: "Task",
      task,
    },
  });

  if (isDragging) {
    return <div className={style.dragTask} />;
  }

  const styles = {
    transition,
    transform: CSS.Transform.toString(transform),
    // opacity: isDragging ? 0.5 : 1,
    // display: isDragging ? "none" : "flex",
  };

  // if (isDragging) {
  //   return <div ref={setNodeRef} style={styles} className={style.task}></div>;
  // }

  return (
    <div
      className={style.task}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={styles}
      // data-isDragging={isDragging}
    >
      <input
        type="checkbox"
        defaultChecked={task.status}
        onChange={() => dispatch(changeStatus(task.id))}
      />
      {!isEditing ? (
        <span className={style.input} onClick={() => setisEditing(true)}>
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
          className={style.input}
        />
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(removeTask(task.id));
        }}
        className={style.deleteButton}
      >
        <TrashIcon className={style.trashSvg} />
      </button>
    </div>
  );
}

import { useDispatch } from "react-redux";
import {
  changeStatus,
  changeTitle,
  removeTask,
  type Task,
} from "../../../store/slices/taskSlices";

interface Props {
  task: Task;
}

export function TaskItem({ task }: Props) {
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="checkbox"
        defaultChecked={task.status}
        onChange={() => dispatch(changeStatus(task.id))}
      />
      <input
        type="text"
        onChange={(e) =>
          dispatch(changeTitle({ id: task.id, title: e.target.value }))
        }
        defaultValue={task.title}
      />
      <button onClick={() => dispatch(removeTask(task.id))}>удалить</button>
    </div>
  );
}

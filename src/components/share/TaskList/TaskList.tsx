import { useSelector } from "react-redux";
import { Input } from "../../ui/Input";
import type { RootState } from "../../../store";

interface Props {
  className?: string;
}

export function TaskList({ className }: Props) {
  const tasks = useSelector((state: RootState) => state.tasks);

  return (
    <div className={className}>
      {tasks.map((task) => (
        <p>{task.title}</p>
      ))}
    </div>
  );
}

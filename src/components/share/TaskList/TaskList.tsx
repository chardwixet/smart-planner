import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { TaskItem } from "../TaskItem";
import { useState } from "react";

interface Props {
  className?: string;
}

type Status = "ALL" | "COMPLETED" | "NOT_COMPLETED";

export function TaskList({ className }: Props) {
  const status = localStorage.getItem("filterStatus");
  const [filterStatus, setFilterStatus] = useState<Status>(
    status ? JSON.parse(status) : "ALL"
  );
  const data = useSelector((state: RootState) => state.tasks);

  const tasks = data.tasks.filter((item) => {
    switch (filterStatus) {
      case "ALL":
        return item;

      case "COMPLETED":
        return item.status === true;

      case "NOT_COMPLETED":
        return item.status === false;
    }
  });

  function setStatus(status: Status) {
    setFilterStatus(status);
    localStorage.setItem("filterStatus", JSON.stringify(status));
  }

  return (
    <div className={className}>
      <div>
        <button onClick={() => setStatus("ALL")}>All</button>
        <button onClick={() => setStatus("COMPLETED")}>Completed</button>
        <button onClick={() => setStatus("NOT_COMPLETED")}>NotCompleted</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}

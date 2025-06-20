import "./App.css";
import { TaskForm } from "./components/share/TaskForm";
import { TaskList } from "./components/share/TaskList";
import { Input } from "./components/ui/Input";

function App() {
  return (
    <>
      <TaskForm />
      <TaskList />
    </>
  );
}

export default App;

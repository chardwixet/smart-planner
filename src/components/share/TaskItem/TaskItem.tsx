import { Input } from "../../ui/Input";

interface Props {
  className?: string;
}

export function TaskItem({ className }: Props) {
  return <div className={className}></div>;
}

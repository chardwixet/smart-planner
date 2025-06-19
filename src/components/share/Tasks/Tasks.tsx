import { Input } from "../../ui/Input";

interface Props {
  className?: string;
}

export function Tasks({ className }: Props) {
  return (
    <div className={className}>
      <Input />
    </div>
  );
}

interface Props {
  className?: string;
}

export function Input({ className }: Props) {
  return <input type="input" placeholder="Введите задание" />;
}

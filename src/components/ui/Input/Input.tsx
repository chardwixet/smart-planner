interface Props {
  className?: string;
}

export function Input({ className }: Props) {
  return (
    <div className={className}>
      <input type="input" placeholder="Введите задание" />
    </div>
  );
}

interface StatusMessageProps {
  readonly message: string;
  readonly variant?: 'default' | 'error';
}

export default function StatusMessage({
  message,
  variant = 'default',
}: StatusMessageProps) {
  const textColor = variant === 'error' ? 'text-destructive' : 'text-reddit';
  return (
    <div className="flex items-center justify-center p-8 bg-secondary rounded-lg">
      <p className={textColor}>{message}</p>
    </div>
  );
}

import { X, GripVertical } from 'lucide-react';

export default function ModalHeader({
  title,
  count,
  onClose,
  onDragStart,
}: Readonly<{
  title: string;
  count: number;
  onClose: () => void;
  onDragStart?: (e: React.MouseEvent) => void;
}>) {
  return (
    <div className={'flex flex-row justify-between items-center mb-4'}>
      <div className={'flex items-center gap-2'}>
        {onDragStart && (
          <GripVertical
            onMouseDown={onDragStart}
            className={'cursor-move text-muted-foreground hover:text-foreground transition-colors'}
            size={20}
          />
        )}
        <h1 className={'text-lg font-bold text-foreground'}>
          {title}
          {count > 0 && <span className={'ml-2'}>({count})</span>}
        </h1>
      </div>
      <X onClick={onClose} className={'cursor-pointer text-foreground'} />
    </div>
  );
}

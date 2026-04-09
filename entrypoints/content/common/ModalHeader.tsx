import { GripVertical, CircleX } from 'lucide-react';
import LimitSelector from '@/entrypoints/content/common/LimitSelector.tsx';

interface ModalHeaderProps {
  readonly title: string;
  readonly dataType: 'posts' | 'comments';
  readonly onClose: () => void;
  readonly onDragStart?: (e: React.MouseEvent) => void;
}

export default function ModalHeader({
  title,
  dataType,
  onClose,
  onDragStart,
}: ModalHeaderProps) {
  return (
    <div className={'flex flex-row justify-between items-center mb-4'}>
      <div className={'flex items-center gap-2'}>
        {onDragStart && (
          <GripVertical
            onMouseDown={onDragStart}
            className={
              'cursor-move text-muted-foreground hover:text-foreground transition-colors'
            }
            size={20}
          />
        )}
        <h1 className={'text-lg font-bold text-foreground'}>{title}</h1>
        <div className={'ml-1'}>
          <LimitSelector
            dataType={dataType}
            showHigherLimits={dataType === 'comments'}
          />
        </div>
      </div>
      <CircleX onClick={onClose} className={'cursor-pointer text-foreground'} />
    </div>
  );
}

import ModalHeader from '@/entrypoints/content/common/ModalHeader.tsx';
import SearchInput from '@/entrypoints/content/common/SearchInput.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { useDraggable } from '@/entrypoints/hooks/useDraggable.tsx';
import { useState, ReactNode } from 'react';

interface ModalProps {
  readonly title: string;
  readonly headerCount: number;
  readonly dataType: 'posts' | 'comments';
  readonly loading: boolean;
  readonly isRefetching?: boolean;
  readonly handleRemove: () => void;
  readonly handleSearch: (searchQuery: string) => void;
  readonly children: ReactNode;
}

export default function Modal({
  title,
  headerCount,
  dataType,
  loading,
  isRefetching,
  handleRemove,
  handleSearch,
  children,
}: ModalProps) {
  const { handleMouseDown, position } = useDraggable();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      handleRemove();
    }, 200); // Match animation duration
  };

  return (
    <div
      className={`flex flex-col space-y-2 w-150 max-h-200 rounded-2xl shadow-sm overflow-hidden bg-secondary p-4 ${
        isClosing ? 'modal-exit' : 'modal-enter'
      } ${isRefetching ? 'modal-loading' : ''}`}
      style={
        {
          '--drag-x': `${position.x}px`,
          '--drag-y': `${position.y}px`,
        } as React.CSSProperties
      }
    >
      <ModalHeader
        title={title}
        count={headerCount}
        dataType={dataType}
        onClose={handleClose}
        onDragStart={handleMouseDown}
      />
      <SearchInput handleSearch={handleSearch} />

      {loading && (
        <div className={'flex justify-center items-center p-2'}>
          <Spinner />
        </div>
      )}

      {children}
    </div>
  );
}

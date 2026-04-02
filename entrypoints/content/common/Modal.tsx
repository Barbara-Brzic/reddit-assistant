import ModalHeader from '@/entrypoints/content/common/ModalHeader.tsx';
import SearchInput from '@/entrypoints/content/common/SearchInput.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import LimitSelector from '@/entrypoints/content/common/LimitSelector.tsx';
import { useDraggable } from '@/entrypoints/hooks/useDraggable.tsx';
import { useState } from 'react';

export default function Modal({
  title,
  headerCount,
  type,
  loading,
  onClose,
  handleSearch,
  children,
}: Readonly<{
  title: string;
  headerCount: number;
  type: 'posts' | 'comments';
  loading: boolean;
  onClose: () => void;
  handleSearch: (searchQuery: string) => void;
  children: React.ReactNode;
}>) {
  const { handleMouseDown, position } = useDraggable();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200); // Match animation duration
  };

  return (
    <div
      className={`flex flex-col space-y-2 w-150 max-h-200 rounded-lg shadow-sm overflow-hidden bg-secondary p-4 ${
        isClosing ? 'modal-exit' : 'modal-enter'
      }`}
      style={{
        '--drag-x': `${position.x}px`,
        '--drag-y': `${position.y}px`,
      } as React.CSSProperties}
    >
      <ModalHeader
        title={title}
        count={headerCount}
        onClose={handleClose}
        onDragStart={handleMouseDown}
      />
      <div className={'flex items-center gap-2'}>
        <SearchInput handleSearch={handleSearch}>
          <LimitSelector type={type} showHigherLimits={type === 'comments'} />
        </SearchInput>
      </div>

      {loading && (
        <div className={'flex justify-center items-center p-2'}>
          <Spinner />
        </div>
      )}

      {children}
    </div>
  );
}

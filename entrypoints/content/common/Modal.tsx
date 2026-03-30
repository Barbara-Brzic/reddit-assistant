import ModalHeader from '@/entrypoints/content/common/ModalHeader.tsx';
import SearchInput from '@/entrypoints/content/common/SearchInput.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import LimitSelector from '@/entrypoints/content/common/LimitSelector.tsx';

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
  return (
    <div
      className={
        'flex flex-col space-y-2 w-150 max-h-200 rounded-lg shadow-sm overflow-hidden bg-secondary p-4'
      }
    >
      <ModalHeader title={title} count={headerCount} onClose={onClose} />
      <div className={'flex items-center gap-2'}>
        <SearchInput handleSearch={handleSearch}>
          <LimitSelector showHigherLimits={type === 'comments'} />
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

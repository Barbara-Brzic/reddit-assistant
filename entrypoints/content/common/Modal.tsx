import ModalHeader from '@/entrypoints/content/common/ModalHeader.tsx';
import SearchInput from '@/entrypoints/content/common/SearchInput.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';

export default function Modal({
  headerCount,
  loading,
  onClose,
  handleSearch,
  children,
}: Readonly<{
  headerCount: number;
  loading: boolean;
  onClose: () => void;
  handleSearch: (searchQuery: string) => void;
  children: React.ReactNode;
}>) {
  return (
    <div
      className={
        'flex flex-col space-y-2 w-140 max-h-200 rounded-lg shadow-sm overflow-hidden bg-secondary p-4'
      }
    >
      <ModalHeader title={'Posts'} count={headerCount} onClose={onClose} />
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

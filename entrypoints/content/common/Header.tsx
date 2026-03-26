import { X } from 'lucide-react';

export default function Header({
  title,
  count,
  onClose,
}: Readonly<{
  title: string;
  count: number;
  onClose: () => void;
}>) {
  return (
    <div className={'flex flex-row justify-between items-center'}>
      <h1 className={'text-lg font-bold'}>
        {title}
        {count > 0 && <span className={'ml-2'}>({count})</span>}
      </h1>
      <X onClick={onClose} className={'cursor-pointer'} />
    </div>
  );
}

import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Spinner({
  className,
  ...props
}: Readonly<React.ComponentProps<'svg'>>) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin text-reddit', className)}
      {...props}
    />
  );
}

export { Spinner };

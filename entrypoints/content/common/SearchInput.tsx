import { Field } from '@/components/ui/field.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useState, ReactNode } from 'react';

interface SearchInputProps {
  readonly handleSearch: (searchQuery: string) => void;
  readonly children?: ReactNode;
}

export default function SearchInput({
  handleSearch,
  children,
}: SearchInputProps) {
  const [value, setValue] = useState('');

  return (
    <Field orientation="horizontal">
      <Input
        type="search"
        placeholder="Ask Gemini to filter or analyze..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch(value);
          }
        }}
        className={
          'text-foreground ring-ring rounded-2xl border-reddit ring-none'
        }
      />
      {children}
      <Button
        variant={'reddit'}
        onClick={() => handleSearch(value)}
        className={'cursor-pointer'}
      >
        Search
      </Button>
    </Field>
  );
}

import { Field } from '@/components/ui/field.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';

export default function SearchInput({
  handleSearch,
}: Readonly<{
  handleSearch: (searchQuery: string) => void;
}>) {
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
        className={'text-foreground ring-ring'}
      />
      <Button onClick={() => handleSearch(value)} className={'cursor-pointer'}>
        Search
      </Button>
    </Field>
  );
}

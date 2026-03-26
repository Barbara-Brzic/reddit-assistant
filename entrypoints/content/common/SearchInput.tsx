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
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={() => handleSearch(value)}>Search</Button>
    </Field>
  );
}

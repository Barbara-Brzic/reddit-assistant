import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import useQueryLimit from '@/entrypoints/hooks/useQueryLimit.tsx';

interface LimitSelectorProps {
  readonly dataType: 'posts' | 'comments';
  readonly showHigherLimits: boolean;
}

export default function LimitSelector({
  dataType,
  showHigherLimits,
}: LimitSelectorProps) {
  const { limit, updateLimit } = useQueryLimit(dataType);

  const handleSelect = (value: string) => {
    updateLimit(Number(value));
  };

  const limitOptions = [10, 25, 50, 100];
  if (showHigherLimits) {
    limitOptions.push(200, 300);
  }

  return (
    <Select value={limit.toString()} onValueChange={handleSelect}>
      <SelectTrigger className="w-fit text-primary">
        <SelectValue />
      </SelectTrigger>
      <SelectContent disablePortal>
        <SelectGroup>
          <SelectLabel>Limits</SelectLabel>
          {limitOptions.map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

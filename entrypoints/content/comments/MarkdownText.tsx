import Markdown from 'react-markdown';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';

interface MarkdownTextProps {
  readonly markdown: string | null;
  readonly handleCancel: () => void;
}

export default function MarkdownText({
  markdown,
  handleCancel,
}: MarkdownTextProps) {
  if (!markdown) return null;

  return (
    <div className="mb-2">
      <h3 className="flex gap-2 text-sm font-semibold mb-2 px-2 text-muted-foreground items-center">
        AI Response
        <X
          className={'text-destructive cursor-pointer'}
          onClick={handleCancel}
        />
      </h3>
      <ScrollArea className="h-48" style={{ width: '100%' }}>
        <div
          className="p-2 text-foreground text-sm pr-4"
          style={{
            maxWidth: '100%',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          <Markdown>{markdown}</Markdown>
        </div>
      </ScrollArea>
    </div>
  );
}

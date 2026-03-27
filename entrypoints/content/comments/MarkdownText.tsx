import Markdown from 'react-markdown';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function MarkdownText({
  markdown,
}: Readonly<{ markdown: string | null }>) {
  if (!markdown) return null;

  return (
    <div className="mb-2">
      <h3 className="text-sm font-semibold mb-2 px-2 text-muted-foreground">
        AI Response
      </h3>
      <ScrollArea className="h-48" style={{ width: '100%' }}>
        <div
          className="p-4 text-foreground text-sm"
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

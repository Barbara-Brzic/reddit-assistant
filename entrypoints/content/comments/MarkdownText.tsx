import Markdown from 'react-markdown';

export default function MarkdownText({
  markdown,
}: Readonly<{ markdown: string | null }>) {
  if (!markdown) return null;

  return (
    <div
      className={'overflow-y-auto p-4 max-h-50 mb-3 text-primary'}
      style={{
        maxWidth: '100%',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
      }}
    >
      <Markdown>{markdown}</Markdown>
    </div>
  );
}

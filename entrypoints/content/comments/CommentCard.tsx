import { Badge } from '@/components/ui/badge.tsx';
import { Card } from '@/components/ui/card.tsx';
import { IComment } from '@/entrypoints/content/scripts/scrap.ts';

export default function CommentCard({
  comment,
  handleCommentClick,
}: Readonly<{
  comment: IComment;
  handleCommentClick: (comment: IComment) => void;
}>) {
  return (
    <Card
      className={
        'flex flex-col p-3 bg-card shadow-sm rounded-lg hover:bg-card-hover cursor-pointer'
      }
      style={{ maxWidth: '100%', wordBreak: 'break-word' }}
      onClick={() => handleCommentClick(comment)}
    >
      <div className={'text-sm mb-2'}>
        <Badge variant={'secondary'}>{comment.author}</Badge>
      </div>
      <h2
        style={{
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {comment.comment}
      </h2>
      <span className={'text-sm text-muted-foreground mt-3'}>
        Score: {comment.score}
      </span>
    </Card>
  );
}

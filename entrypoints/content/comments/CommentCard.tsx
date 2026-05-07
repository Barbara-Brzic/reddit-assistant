import { Badge } from '@/components/ui/badge.tsx';
import { Card } from '@/components/ui/card.tsx';
import { ArrowBigUp } from 'lucide-react';
import { IComment } from '@/entrypoints/content/types/reddit.ts';

interface CommentCardProps {
  readonly comment: IComment;
  readonly handleCommentClick: (comment: IComment) => void;
}

export default function CommentCard({
  comment,
  handleCommentClick,
}: CommentCardProps) {
  return (
    <Card
      className={
        'flex flex-col p-3 bg-card shadow-sm rounded-2xl border-primary/40 hover:border-orange-500 hover:shadow-xl cursor-pointer text-sm transition-all duration-300 ease-out'
      }
      style={{
        maxWidth: '100%',
        wordBreak: 'break-word',
        willChange: 'transform',
      }}
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
      <Badge
        variant={'outline'}
        className={
          'flex items-center gap-1 rounded-2xl text-primary/80 border-primary/40 mt-3 w-fit'
        }
      >
        <ArrowBigUp className={'h-3 w-3'} />
        {comment.score}
      </Badge>
    </Card>
  );
}

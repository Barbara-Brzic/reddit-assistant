import { Badge } from '@/components/ui/badge.tsx';
import { Card } from '@/components/ui/card.tsx';
import { ArrowBigUp, MessageCircle } from 'lucide-react';
import { IPost } from '@/entrypoints/content/types/reddit.ts';

interface PostCardProps {
  readonly post: IPost;
}

export default function PostCard({ post }: PostCardProps) {
  const handlePostClick = (post: IPost) => {
    if (post.link) {
      window.open(post.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card
      key={post.id}
      className={
        'flex flex-col px-4 py-2 bg-card drop-shadow-md rounded-2xl border-primary/40 hover:-translate-y-1 hover:shadow-xl cursor-pointer transition-all duration-300 ease-out'
      }
      style={{
        maxWidth: '100%',
        wordBreak: 'break-word',
        willChange: 'transform',
      }}
      onClick={() => handlePostClick(post)}
    >
      {post.tag && (
        <div className={'ml-auto text-sm mb-1'}>
          <Badge variant={'secondary'}>{post.tag}</Badge>
        </div>
      )}
      <h2>{post.title}</h2>
      <p className={'text-sm text-muted-foreground'}>{post.description}</p>

      <div className={'flex items-center gap-2 mt-2'}>
        <Badge
          variant={'outline'}
          className={
            'flex items-center gap-1 text-primary/80 border-primary/40 rounded-2xl'
          }
        >
          <ArrowBigUp className={'h-3 w-3'} />
          {post.score}
        </Badge>
        <Badge
          variant={'outline'}
          className={
            'flex items-center gap-1 text-primary/80 border-primary/40 rounded-2xl'
          }
        >
          <MessageCircle className={'h-3 w-3'} />
          {post.comments}
        </Badge>
      </div>
    </Card>
  );
}

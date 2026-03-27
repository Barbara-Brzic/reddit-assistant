import { Badge } from '@/components/ui/badge.tsx';
import { Card } from '@/components/ui/card.tsx';
import { IPost } from '@/entrypoints/content/scripts/scrap.ts';

export default function PostCard({ post }: Readonly<{ post: IPost }>) {
  const handlePostClick = (post: IPost) => {
    if (post.link) {
      window.open(post.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card
      key={post.id}
      className={
        'flex flex-col px-4 py-2 bg-card drop-shadow-md rounded-lg hover:bg-card-hover cursor-pointer'
      }
      onClick={() => handlePostClick(post)}
    >
      {post.tag && (
        <div className={'ml-auto text-sm'}>
          <Badge variant={'secondary'}>{post.tag}</Badge>
        </div>
      )}
      <h2>{post.title}</h2>
      <p className={'text-sm text-muted-foreground'}>{post.description}</p>

      <div className={'flex items-center gap-5 mt-2'}>
        <span className={'text-sm text-muted-foreground'}>
          Score: {post.score}
        </span>
        <span className={'text-sm text-muted-foreground'}>
          {post.comments} comments
        </span>
      </div>
    </Card>
  );
}

import Header from '@/entrypoints/content/common/Header.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { Badge } from '@/components/ui/badge';
import { IPost } from '@/entrypoints/content/scripts/scrap.ts';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card.tsx';

export default function PostsModal({
  posts,
  onRemove,
}: Readonly<{
  posts: IPost[];
  onRemove: () => void;
}>) {
  const [loading, setLoading] = useState(false);

  const handlePostClick = (post: IPost) => {
    if (post.link) {
      window.open(post.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={
        'min-w-130 max-h-170 rounded-md shadow-sm overflow-hidden bg-secondary p-2'
      }
    >
      <Header title={'Posts'} count={posts?.length} onClose={onRemove} />
      <div className={'flex flex-col justify-center align-center w-full'}>
        {loading && (
          <div className={'flex justify-center items-center p-2'}>
            <Spinner />
          </div>
        )}

        <ScrollArea className={'h-150 w-130'}>
          <div className={'flex flex-col gap-2 p-2'}>
            {posts?.map((post) => (
              <Card
                key={post.id}
                className={
                  'flex flex-col px-4 py-2 bg-card shadow-sm rounded-md hover:bg-accent cursor-pointer'
                }
                onClick={() => handlePostClick(post)}
              >
                {post.tag && (
                  <div className={'ml-auto text-sm'}>
                    <Badge variant={'secondary'}>{post.tag}</Badge>
                  </div>
                )}
                <h2>{post.title}</h2>
                <p className={'text-sm text-muted-foreground'}>
                  {post.description}
                </p>
                <div>
                  <div className={'flex items-center gap-5'}>
                    <span className={'text-sm text-muted-foreground'}>
                      Score: {post.score}
                    </span>
                    <span className={'text-sm text-muted-foreground'}>
                      {post.comments} comments
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

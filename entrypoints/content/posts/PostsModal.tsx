import Header from '@/entrypoints/content/common/Header.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { Badge } from '@/components/ui/badge';

export default function PostsModal({
  onRemove,
}: Readonly<{
  onRemove: () => void;
}>) {
  const [loading, setLoading] = useState(false);

  const postData = [
    {
      id: 1,
      tag: 'Technology',
      title: 'Post 1',
      description: 'This is the content of post 1.',
      score: 130,
      comments: 5,
    },
    {
      id: 2,
      tag: 'Technology',
      title: 'Post 1',
      description: 'This is the content of post 1.',
      score: 145,
      comments: 23,
    },
  ];

  return (
    <div
      className={
        'min-w-125 rounded-md shadow-sm overflow-hidden bg-secondary p-2'
      }
    >
      <Header title={'Posts'} count={postData?.length} onClose={onRemove} />
      <div className={'flex flex-col justify-center align-center w-full'}>
        {loading ? (
          <div className={'flex justify-center items-center p-2'}>
            <Spinner />
          </div>
        ) : (
          <div className={'flex flex-col gap-2'}>
            {postData?.map((post) => (
              <div
                key={post.id}
                className={'flex flex-col p-2 bg-card shadow-sm rounded-md'}
              >
                <div className={'ml-auto text-sm'}>
                  <Badge variant={'secondary'}>{post.tag}</Badge>
                </div>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

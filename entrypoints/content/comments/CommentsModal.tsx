import Header from '@/entrypoints/content/common/Header.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import Markdown from 'react-markdown';

export default function CommentsModal({
  onRemove,
}: Readonly<{ onRemove: () => void }>) {
  const [loading, setLoading] = useState(false);
  const commentsData = [
    {
      id: 1,
      author: 'John Doe',
      comment: 'This is a comment on the post.',
      score: 10,
    },
  ];
  return (
    <div
      className={
        'min-w-125 rounded-md shadow-sm overflow-hidden bg-secondary p-2'
      }
    >
      <Header
        title={'Comments'}
        count={commentsData?.length}
        onClose={onRemove}
      />
      <div className={'flex flex-col justify-center align-center w-full'}>
        {loading && (
          <div className={'flex justify-center items-center p-2'}>
            <Spinner />
          </div>
        )}
        <div className={'overflow-y-auto p-4'}>
          <Markdown></Markdown>
        </div>

        <div className={'flex flex-col gap-2'}>
          {commentsData?.map((comment) => (
            <div
              key={comment.id}
              className={'flex flex-col p-2 bg-card shadow-sm rounded-md'}
            >
              <div className={'text-sm mb-2'}>
                <Badge variant={'secondary'}>{comment.author}</Badge>
              </div>
              <h2>{comment.comment}</h2>
              <span className={'text-sm text-muted-foreground mt-3'}>
                Score: {comment.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

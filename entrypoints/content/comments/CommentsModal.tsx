import Header from '@/entrypoints/content/common/Header.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import Markdown from 'react-markdown';
import { IComment, IPost } from '@/entrypoints/content/scripts/scrap.ts';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { Card } from '@/components/ui/card.tsx';

export default function CommentsModal({
  post,
  comments,
  onRemove,
}: Readonly<{ post: IPost; comments: IComment[]; onRemove: () => void }>) {
  const [loading, setLoading] = useState(false);

  const handleCommentClick = (comment: IComment) => {
    if (comment.permalink) {
      window.open(comment.permalink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={
        'min-w-130 max-h-180 rounded-md shadow-sm overflow-hidden bg-secondary p-2'
      }
    >
      <Header title={'Comments'} count={comments?.length} onClose={onRemove} />
      <div className={'flex flex-col justify-center align-center w-full'}>
        {loading && (
          <div className={'flex justify-center items-center p-2'}>
            <Spinner />
          </div>
        )}
        <div className={'overflow-y-auto p-4'}>
          <Markdown></Markdown>
        </div>

        <ScrollArea className={'h-150 w-130'}>
          <div className={'flex flex-col gap-2'}>
            {comments?.map((comment) => (
              <Card
                key={comment.id}
                className={
                  'flex flex-col p-3 bg-card shadow-sm rounded-md hover:bg-accent cursor-pointer'
                }
                onClick={() => handleCommentClick(comment)}
              >
                <div className={'text-sm mb-2'}>
                  <Badge variant={'secondary'}>{comment.author}</Badge>
                </div>
                <h2>{comment.comment}</h2>
                <span className={'text-sm text-muted-foreground mt-3'}>
                  Score: {comment.score}
                </span>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

import Header from '@/entrypoints/content/common/Header.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import Markdown from 'react-markdown';
import { IComment, IPost } from '@/entrypoints/content/scripts/scrap.ts';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { Card } from '@/components/ui/card.tsx';
import SearchInput from '@/entrypoints/content/common/SearchInput.tsx';
import useCommentsSearch from '@/entrypoints/hooks/useCommentsSearch.tsx';

export default function CommentsModal({
  post,
  comments,
  onRemove,
}: Readonly<{ post: IPost; comments: IComment[]; onRemove: () => void }>) {
  const { searchComments, geminiResponse, loading } = useCommentsSearch(
    post,
    comments
  );

  const handleCommentClick = (comment: IComment) => {
    if (comment.permalink) {
      window.open(comment.permalink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={
        'rounded-md shadow-sm overflow-hidden bg-secondary p-4 max-h-180 w-130  flex flex-col space-y-2'
      }
    >
      <Header title={'Comments'} count={comments?.length} onClose={onRemove} />
      <SearchInput handleSearch={searchComments} />
      <div className={'flex flex-col justify-center align-center w-full'}>
        {loading && (
          <div className={'flex justify-center items-center p-2'}>
            <Spinner />
          </div>
        )}

        {geminiResponse && (
          <div
            className={'overflow-y-auto p-4 max-h-50 mb-3'}
            style={{
              maxWidth: '100%',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            <Markdown>{geminiResponse}</Markdown>
          </div>
        )}

        <ScrollArea className={'h-150'} style={{ width: '100%' }}>
          <div className={'flex flex-col gap-2'}>
            {comments?.map((comment) => (
              <Card
                key={comment.id}
                className={
                  'flex flex-col p-3 bg-card shadow-sm rounded-md hover:bg-accent cursor-pointer'
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
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

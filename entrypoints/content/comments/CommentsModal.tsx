import Header from '@/entrypoints/content/common/Header.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { IComment, IPost } from '@/entrypoints/content/scripts/scrap.ts';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import SearchInput from '@/entrypoints/content/common/SearchInput.tsx';
import useCommentsSearch from '@/entrypoints/hooks/useCommentsSearch.tsx';
import CommentCard from '@/entrypoints/content/comments/CommentCard.tsx';
import MarkdownText from '@/entrypoints/content/comments/MarkdownText.tsx';

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

      {loading && (
        <div className={'flex justify-center items-center p-2'}>
          <Spinner />
        </div>
      )}

      <MarkdownText markdown={geminiResponse} />

      <ScrollArea className={'h-150'} style={{ width: '100%' }}>
        <div className={'flex flex-col gap-2'}>
          {comments?.map((comment) => (
            <CommentCard
              comment={comment}
              handleCommentClick={handleCommentClick}
              key={comment.id}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

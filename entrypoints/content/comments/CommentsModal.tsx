import { IComment, IPost } from '@/entrypoints/content/scripts/utils.ts';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import useCommentsSearch from '@/entrypoints/hooks/useCommentsSearch.tsx';
import CommentCard from '@/entrypoints/content/comments/CommentCard.tsx';
import MarkdownText from '@/entrypoints/content/comments/MarkdownText.tsx';
import Modal from '@/entrypoints/content/common/Modal.tsx';

export default function CommentsModal({
  post,
  comments,
  onRemove,
  isRefetching,
}: Readonly<{
  post: IPost;
  comments: IComment[];
  onRemove: () => void;
  isRefetching?: boolean;
}>) {
  const { geminiResponse, loading, searchComments, resetGeminiResponse } =
    useCommentsSearch(post, comments);

  const handleCommentClick = (comment: IComment) => {
    if (comment.permalink) {
      window.open(comment.permalink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Modal
      title={'Comments'}
      headerCount={comments?.length}
      type={'comments'}
      loading={loading}
      isRefetching={isRefetching}
      onClose={onRemove}
      handleSearch={searchComments}
    >
      <MarkdownText
        markdown={geminiResponse}
        handleCancel={resetGeminiResponse}
      />

      <div className="mb-2">
        <h3 className="text-sm font-semibold mb-2 px-2 text-muted-foreground">
          Comments
        </h3>
        <ScrollArea
          className={geminiResponse ? 'h-80' : 'h-130'}
          style={{ width: '100%' }}
        >
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
    </Modal>
  );
}

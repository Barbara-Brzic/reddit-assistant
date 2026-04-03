import { IComment, IPost } from '@/entrypoints/content/scripts/utils.ts';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import useCommentsSearch from '@/entrypoints/hooks/useCommentsSearch.tsx';
import CommentCard from '@/entrypoints/content/comments/CommentCard.tsx';
import MarkdownText from '@/entrypoints/content/comments/MarkdownText.tsx';
import Modal from '@/entrypoints/content/common/Modal.tsx';

interface CommentsModalProps {
  readonly data: {
    post: IPost;
    comments: IComment[];
  };
  readonly handleRemove: () => void;
  readonly isRefetching?: boolean;
}

export default function CommentsModal({
  data,
  handleRemove,
  isRefetching,
}: CommentsModalProps) {
  const { post, comments } = data;
  const { aiResponse, loading, searchComments, resetAiResponse } =
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
      dataType={'comments'}
      loading={loading}
      isRefetching={isRefetching}
      handleRemove={handleRemove}
      handleSearch={searchComments}
    >
      <MarkdownText markdown={aiResponse} handleCancel={resetAiResponse} />

      <div className="mb-2">
        <h3 className="text-sm font-semibold mb-2 px-2 text-muted-foreground">
          Comments
        </h3>
        <ScrollArea
          className={aiResponse ? 'h-80' : 'h-130'}
          style={{ width: '100%' }}
        >
          <div className={'flex flex-col gap-3 pt-1'}>
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

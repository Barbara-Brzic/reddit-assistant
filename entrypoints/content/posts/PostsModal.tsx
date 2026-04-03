import { IPost } from '@/entrypoints/content/scripts/utils.ts';
import { ScrollArea } from '@/components/ui/scroll-area';
import usePostsSearch from '@/entrypoints/hooks/usePostsSearch.tsx';
import PostCard from '@/entrypoints/content/posts/PostCard.tsx';
import Modal from '@/entrypoints/content/common/Modal.tsx';
import { X } from 'lucide-react';

interface PostsModalProps {
  readonly data: { posts: IPost[] };
  readonly handleRemove: () => void;
  readonly isRefetching?: boolean;
}

export default function PostsModal({
  data,
  handleRemove,
  isRefetching,
}: PostsModalProps) {
  const { posts } = data;
  const { aiResponse, loading, searchPosts, resetAiResponse } =
    usePostsSearch();

  return (
    <Modal
      title={'Posts'}
      headerCount={aiResponse?.length || posts?.length}
      dataType={'posts'}
      loading={loading}
      isRefetching={isRefetching}
      handleRemove={handleRemove}
      handleSearch={(searchQuery) => searchPosts(searchQuery, posts)}
    >
      <div className="mb-2">
        <h3 className="text-sm font-semibold mb-2 px-2 text-muted-foreground">
          {aiResponse?.length ? (
            <span className={'flex gap-2 items-center'}>
              AI Response{' '}
              <X
                onClick={() => resetAiResponse()}
                className={'text-destructive cursor-pointer'}
              />
            </span>
          ) : (
            'Posts'
          )}
        </h3>
        <ScrollArea className={'h-150'} style={{ width: '100%' }}>
          <div className={'flex flex-col gap-2'}>
            {(aiResponse?.length ? aiResponse : posts)?.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </Modal>
  );
}

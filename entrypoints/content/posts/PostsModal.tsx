import { IPost } from '@/entrypoints/content/scripts/scrap.ts';
import { ScrollArea } from '@/components/ui/scroll-area';
import usePostsSearch from '@/entrypoints/hooks/usePostsSearch.tsx';
import PostCard from '@/entrypoints/content/posts/PostCard.tsx';
import Modal from '@/entrypoints/content/common/Modal.tsx';
import { X } from 'lucide-react';

export default function PostsModal({
  posts,
  onRemove,
}: Readonly<{
  posts: IPost[];
  onRemove: () => void;
}>) {
  const { geminiResponse, loading, searchPosts, resetGeminiResponse } =
    usePostsSearch();

  return (
    <Modal
      title={'Posts'}
      headerCount={geminiResponse?.length || posts?.length}
      loading={loading}
      onClose={onRemove}
      handleSearch={(searchQuery) => searchPosts(searchQuery, posts)}
    >
      <div className="mb-2">
        <h3 className="text-sm font-semibold mb-2 px-2 text-muted-foreground">
          {geminiResponse?.length ? (
            <span className={'flex gap-2 items-center'}>
              AI Response{' '}
              <X
                onClick={() => resetGeminiResponse()}
                className={'text-destructive cursor-pointer'}
              />
            </span>
          ) : (
            'Posts'
          )}
        </h3>
        <ScrollArea className={'h-150'} style={{ width: '100%' }}>
          <div className={'flex flex-col gap-2'}>
            {(geminiResponse?.length ? geminiResponse : posts)?.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </Modal>
  );
}

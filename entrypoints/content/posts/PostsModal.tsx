import Header from '@/entrypoints/content/common/Header.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { IPost } from '@/entrypoints/content/scripts/scrap.ts';
import { ScrollArea } from '@/components/ui/scroll-area';
import SearchInput from '@/entrypoints/content/common/SearchInput.tsx';
import usePostsSearch from '@/entrypoints/hooks/usePostsSearch.tsx';
import PostCard from '@/entrypoints/content/posts/PostCard.tsx';

export default function PostsModal({
  posts,
  onRemove,
}: Readonly<{
  posts: IPost[];
  onRemove: () => void;
}>) {
  const { searchPosts, geminiResponse, loading } = usePostsSearch();

  return (
    <div
      className={
        'flex flex-col space-y-2 w-140 max-h-170 rounded-lg shadow-sm overflow-hidden bg-secondary p-4'
      }
    >
      <Header
        title={'Posts'}
        count={geminiResponse?.length || posts?.length}
        onClose={onRemove}
      />
      <SearchInput
        handleSearch={(searchQuery) => searchPosts(searchQuery, posts)}
      />

      {loading && (
        <div className={'flex justify-center items-center p-2'}>
          <Spinner />
        </div>
      )}

      <ScrollArea className={'h-150'} style={{ width: '100%' }}>
        <div className={'flex flex-col gap-2'}>
          {(geminiResponse?.length ? geminiResponse : posts)?.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

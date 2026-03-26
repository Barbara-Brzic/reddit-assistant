import '../popup/style.css';
import React from 'react';
import { CreateContentElement } from '@/entrypoints/content/common';
import PostsModal from '@/entrypoints/content/posts/PostsModal.tsx';
import { ContentScriptContext } from 'wxt/utils/content-script-context';
import CommentsModal from '@/entrypoints/content/comments/CommentsModal.tsx';

export default defineContentScript({
  matches: ['*://*/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    chrome.runtime.onMessage.addListener(async (message) => {
      switch (message.action) {
        case 'post': {
          const postui = await CreateUI(ctx, 'posts');
          postui.mount();
          break;
        }
        case 'comment': {
          const commentui = await CreateUI(ctx, 'comments');
          commentui.mount();
          break;
        }
        default:
          break;
      }
    });
  },
});

const CreateUI = async (
  ctx: ContentScriptContext,
  type: 'posts' | 'comments'
) => {
  let removeUi: (() => void) | null = null;

  const ui = await createShadowRootUi(ctx, {
    name: 'post-element',
    position: 'overlay',
    onMount: (uiContainer, shadow, shadowHost) => {
      return CreateContentElement(uiContainer, (root) => {
        const onRemove = () => {
          if (removeUi) removeUi();
        };

        switch (type) {
          case 'posts':
            return <PostsModal onRemove={onRemove} />;
          case 'comments':
            return <CommentsModal onRemove={onRemove} />;
        }
      });
    },
    onRemove(root) {
      root?.unmount();
    },
  });

  removeUi = () => ui.remove();
  return ui;
};

import '../popup/style.css';
import React from 'react';
import { CreateContentElement } from '@/entrypoints/content/common';
import { ContentScriptContext } from 'wxt/utils/content-script-context';
import RedditDataLoader from '@/entrypoints/content/common/RedditDataLoader.tsx';

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
    name: 'reddit-assistant-ui',
    position: 'inline',
    anchor: 'body',
    onMount: (uiContainer) => {
      return CreateContentElement(uiContainer, () => {
        const onRemove = () => {
          if (removeUi) removeUi();
        };

        return <RedditDataLoader type={type} onRemove={onRemove} />;
      });
    },
    onRemove(root) {
      root?.unmount();
    },
  });

  removeUi = () => ui.remove();
  return ui;
};

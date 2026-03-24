import '../popup/style.css';
import React from 'react';
import { CreateContentElement } from '@/entrypoints/content/common';

export default defineContentScript({
  matches: ['*://*/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    chrome.runtime.onMessage.addListener(async (message) => {
      switch (message.action) {
        case 'post': {
          const postui = await CreateUI(ctx, 'post');
          postui.mount();
          break;
        }
        case 'comment': {
          const commentui = await CreateUI(ctx, 'comment');
          commentui.mount();
          break;
        }
        default:
          break;
      }
    });
  },
});

const CreateUI = async (ctx: any, message: string) => {
  return createShadowRootUi(ctx, {
    name: 'post-element',
    position: 'overlay',
    onMount: (uiContainer, shadow, shadowHost) => {
      return CreateContentElement(uiContainer, shadowHost, (root) => {
        return <h1>Hello world {message}</h1>;
      });
    },
    onRemove(root) {
      root?.unmount();
    },
  });
};

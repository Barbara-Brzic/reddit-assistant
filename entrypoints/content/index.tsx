import '../popup/style.css';
import ReactDOM from 'react-dom/client';
import React from 'react';

export default defineContentScript({
  matches: ['*://*/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    console.log('Content script is running');
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
      const app = document.createElement('div');
      uiContainer.append(app);

      const styles = {
        visibility: 'visible',
        position: 'fixed',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '9999',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      };
      Object.assign(shadowHost.style, styles);

      const root = ReactDOM.createRoot(app);
      root.render(
        <React.StrictMode>
          <div className={'bg-amber-400 h-100'}>Hello World!! {message}</div>
        </React.StrictMode>
      );
      return root;
    },
    onRemove(root) {
      root?.unmount();
    },
  });
};

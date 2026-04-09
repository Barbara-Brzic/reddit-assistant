export default defineBackground({
  main() {
    chrome.runtime.onInstalled.addListener(() => {
      chrome.contextMenus.create({
        id: 'post',
        title: 'Filter Posts',
        contexts: ['page'],
        documentUrlPatterns: ['*://*.reddit.com/*'],
      });
      chrome.contextMenus.create({
        id: 'comment',
        title: 'Analyze Comments',
        contexts: ['page'],
        documentUrlPatterns: ['*://*.reddit.com/*'],
      });
    });

    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
      if (info.menuItemId === 'post') {
        chrome.tabs.sendMessage(tab?.id!, { action: 'post' });
      }

      if (info.menuItemId === 'comment') {
        chrome.tabs.sendMessage(tab?.id!, { action: 'comment' });
      }
    });
  },
});

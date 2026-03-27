import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: ({ manifestVersion }) => {
    return {
      manifest_version: manifestVersion,
      name: 'Reddit Assistant',
      description: 'Reddit Assistant',
      version: '1.0.0',
      permissions: [
        'storage',
        'tabs',
        'activeTab',
        'scripting',
        'contextMenus',
        'declarativeNetRequest',
      ],
    };
  },
});

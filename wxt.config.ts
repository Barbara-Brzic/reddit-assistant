import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: ({ manifestVersion }) => {
    return {
      manifest_version: manifestVersion,
      name: 'Reddit Assistant (Beta)',
      description: 'AI-powered Reddit assistant for filtering posts and analyzing comments',
      version: '0.1.0',
      permissions: ['storage', 'tabs', 'activeTab', 'contextMenus'],
      host_permissions: ['*://*.reddit.com/*'],
    };
  },
});

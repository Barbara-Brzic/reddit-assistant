# Privacy Policy for Reddit Assistant

**Last Updated: April 9, 2026**

## Introduction

Reddit Assistant ("we", "our", or "the extension") is committed to protecting your privacy. This Privacy Policy explains how our Chrome extension handles your information.

## Information We Collect

### Information You Provide

- **API Credentials**: You provide your Gemini API endpoint and API key through the extension's configuration interface. These credentials are stored locally on your device using Chrome's local storage.

### Automatically Collected Information

- **Reddit Data**: The extension accesses publicly available Reddit posts and comments from subreddits you visit. This data is fetched directly from Reddit's public API and is only processed locally in your browser.

## How We Use Your Information

Your information is used solely to provide the extension's functionality:

- **API Credentials**: Used to authenticate requests to the Gemini API service you configure
- **Reddit Data**: Processed locally to provide you with enhanced Reddit browsing features

## Data Storage

All data is stored locally on your device:

- API credentials are stored using Chrome's `chrome.storage.local` API
- No data is transmitted to our servers or any third-party servers except:
  - Reddit's public API (to fetch posts and comments)
  - Your configured Gemini API endpoint (using your provided credentials)

## Third-Party Services

The extension interacts with the following third-party services:

### Reddit API
- The extension fetches publicly available posts and comments from Reddit
- Reddit's Privacy Policy: https://www.reddit.com/policies/privacy-policy

### Google Gemini API
- You configure your own Gemini API endpoint and credentials
- The extension sends data to your configured endpoint for processing
- Google's Privacy Policy: https://policies.google.com/privacy

## Data Sharing

We do not:
- Collect, store, or transmit your personal information to our servers
- Share your data with third parties
- Track your browsing activity
- Use analytics or tracking services

## Permissions Explanation

The extension requires the following Chrome permissions:

- **storage**: To save your API configuration locally on your device
- **tabs**: To interact with Reddit tabs and inject content scripts
- **activeTab**: To access the currently active Reddit tab
- **scripting**: To enhance Reddit pages with additional features
- **contextMenus**: To provide right-click menu options
- **declarativeNetRequest**: To modify network requests if needed
- **host_permissions**: To access Reddit.com and communicate with your configured API endpoint

## Data Security

- All API credentials are stored locally on your device using Chrome's secure storage mechanisms
- No data is transmitted to external servers except to the services you explicitly configure (Reddit API and your Gemini API endpoint)
- We do not have access to your API credentials or any data processed by the extension

## Your Rights

You have the right to:
- Delete your API credentials at any time by clearing the extension's storage or uninstalling the extension
- Stop using the extension at any time by disabling or uninstalling it
- Request information about your data (though we do not collect or store data on our servers)

## Children's Privacy

This extension is not intended for users under the age of 13. We do not knowingly collect information from children under 13.

## Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last Updated" date at the top of this Privacy Policy. Continued use of the extension after changes constitutes acceptance of the updated policy.

## Open Source

This extension is open source. You can review the code to verify our privacy practices.

## Contact Us

If you have any questions about this Privacy Policy or the extension's privacy practices, please contact us at:

[bbrzic35@gmail.com]

## Compliance

This extension complies with:
- Chrome Web Store Developer Program Policies
- General Data Protection Regulation (GDPR)

## Data Retention

Since all data is stored locally on your device:
- Data persists until you clear it through the extension or uninstall the extension
- No data is retained on external servers

## Your Consent

By using this extension, you consent to this Privacy Policy and agree to its terms.

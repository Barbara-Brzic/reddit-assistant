# Reddit Assistant - WXT + React + Gemini API

A web extension that enhances Reddit browsing with AI-powered post filtering and comment analysis using Google's Gemini API.

## About

This extension adds context menu options to Reddit pages, allowing users to quickly filter posts or analyze comment threads using natural language queries. It provides an intuitive interface for exploring Reddit content with adjustable limits and AI-powered insights.

## Technologies

- **WXT** - Modern web extension framework
- **React** - UI library with TypeScript
- **Tailwind CSS** - Styling framework
- **shadcn/ui** - Component library
- **Reddit API** - Fetching posts and comments data
- **Google Gemini API** - AI-powered content analysis
- **Chrome Extension APIs** - Storage and context menus

## Features

- Filter posts from any subreddit or Reddit home feed using natural language queries
- Analyze comment threads and get AI-generated summaries
- Separate configurable limits for posts and comments
- Dark mode interface rendered in shadow DOM
- Context menu integration for quick access

## Setup

### Prerequisites

- Node.js and pnpm installed
- Google Gemini API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start development mode:
   ```bash
   pnpm dev
   ```

4. Load the extension in your browser:
   - Chrome: Navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `.output/chrome-mv3` directory

## Configuration

1. Click the extension icon in your browser toolbar
2. Enter your Gemini API endpoint URL
3. Enter your Gemini API key
4. Click "Save Credentials"

## Usage

### Filtering Posts

1. Navigate to any Reddit page (home, subreddit, or specific post)
2. Right-click anywhere on the page
3. Select "Reddit Assistant" > "Filter Posts"
4. Use the search input to ask Gemini to filter posts (e.g., "Show posts about technology")
5. Adjust the limit selector to control how many posts to fetch

### Analyzing Comments

1. Navigate to a Reddit post page
2. Right-click anywhere on the page
3. Select "Reddit Assistant" > "Analyze Comments"
4. Use the search input to ask questions about the comments (e.g., "Summarize the main opinions")
5. Adjust the limit selector to control how many comments to fetch

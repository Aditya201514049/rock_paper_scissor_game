This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Overview

This project is a modern implementation of the classic Rock Paper Scissors game. It is built using Next.js, Firebase, and Tailwind CSS with DaisyUI for styling. The application includes features like user authentication, game statistics tracking, a leaderboard, and theme switching (light/dark mode).

## Features

- **User Authentication**: Sign in with Google to save your progress and stats.
- **Game Statistics**: Track your wins, losses, draws, and win ratio.
- **Multi-Round Games**: Play single or multi-round matches.
- **Leaderboard**: Compare your performance with other players.
- **Theme Switching**: Toggle between light and dark modes.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## File Structure

- **app/**: Contains the main application pages and layout.
  - `layout.js`: Defines the global layout, including the Navbar and Footer.
  - `page.jsx`: The homepage with the game logic and stats.
  - Subfolders for additional pages like About, Privacy, Terms, etc.
- **components/**: Reusable UI components like Navbar, Footer, GameLogic, Stats, etc.
- **context/**: Context for managing global state, such as ThemeContext for theme switching.
- **lib/**: Firebase configuration and utility functions for Firestore operations.
- **public/**: Static assets like images and icons.
- **tailwind.config.mjs**: Tailwind CSS configuration with DaisyUI themes.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- Firebase project with authentication and Firestore enabled

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd rock_paper_scissor_game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Create a `.env` file in the root directory.
   - Add your Firebase configuration:
     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

The app can be deployed on platforms like Vercel. Follow the [Next.js deployment guide](https://nextjs.org/docs/deployment) for detailed instructions.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

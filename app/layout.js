// app/layout.js
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
 // Import our client provider
import './globals.css';

export const metadata = {
  title: 'Rock Paper Scissors',
  description: 'A multiplayer Rock Paper Scissors game with Firebase Auth',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-gray-900 flex flex-col min-h-screen">
        {/* Wrap Navbar and main content with ThemeProvider */}
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow mt-0">{children}</main>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}

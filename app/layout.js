

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; // Import Footer
import './globals.css';

export const metadata = {
  title: 'Rock Paper Scissors',
  description: 'A multiplayer Rock Paper Scissors game with Firebase Auth',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" text-gray-900 flex flex-col min-h-screen">
        {/* Navbar stays on top */}
        <Navbar />
        
        {/* Main content */}
        <main className="flex-grow mt-0">{children}</main>

        {/* Footer stays at the bottom */}
        <Footer />
      </body>
    </html>
  );
}

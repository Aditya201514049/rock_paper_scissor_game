
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Rock Paper Scissors',
  description: 'A multiplayer Rock Paper Scissors game with Firebase Auth',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}

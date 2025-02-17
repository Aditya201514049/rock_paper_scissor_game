import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white p-2 mt-0">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm">© 2025 Rock Paper Scissors. All rights reserved.</p>
        <div className="mt-2">
          <Link href="/about" className="text-white hover:underline mx-2">About</Link>
          <Link href="/terms" className="text-white hover:underline mx-2">Terms & Conditions</Link>
          <Link href="/privacy" className="text-white hover:underline mx-2">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

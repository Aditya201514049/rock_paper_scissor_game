'use client';

import { auth } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        router.push('/'); // Redirect to home if not logged in
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
      <div className="mt-4">
        <img
          src={user.photoURL || '/default-avatar.png'}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto shadow-md"
        />
        <p className="mt-2 text-lg text-gray-700">
          <strong>Name:</strong> {user.displayName || 'No Name'}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-700">
          <strong>UID:</strong> {user.uid}
        </p>
      </div>
    </div>
  );
};

export default Profile;

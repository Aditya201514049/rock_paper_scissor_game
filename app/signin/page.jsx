'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import GoogleSignIn from '@/components/GoogleSignIn';
import Image from 'next/image';

const SignInPage = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/'); // Redirect to Home page if user is already signed in
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="hero min-h-screen bg-base-200 bg-gradient-to-br from-primary/20 to-secondary/20">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8 max-w-5xl">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-5xl font-bold text-primary">Rock Paper Scissor</h1>
          <p className="py-6 text-lg">
            Challenge your luck and strategy in this classic game. Sign in to track your stats, 
            compete with friends, and climb the leaderboard!
          </p>
          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </div>
              <div className="stat-title">Total Players</div>
              <div className="stat-value text-primary">500+</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div className="stat-title">Games Played</div>
              <div className="stat-value text-secondary">2.6k</div>
            </div>
          </div>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 lg:w-1/2">
          <div className="card-body">
            <div className="flex justify-center mb-4">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <div className="flex items-center justify-center bg-primary/10 h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-12 h-12 stroke-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="card-title text-2xl font-bold text-center mx-auto">Welcome Back!</h2>
            <p className="text-center text-gray-500 mb-6">Sign in to continue your game journey</p>
            <GoogleSignIn />
            <div className="divider">OR</div>
            <button className="btn btn-outline btn-secondary" onClick={() => router.push('/about')}>
              Learn More
            </button>
            <p className="text-center text-gray-400 text-xs mt-4">
              By signing in, you agree to our{' '}
              <a href="/terms" className="text-primary hover:underline">
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

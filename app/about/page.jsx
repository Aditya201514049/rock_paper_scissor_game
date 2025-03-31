'use client';

import { useTheme } from '@/context/ThemeContext';

export default function About() {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen bg-base-200 pt-24 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center text-primary mb-8">About Rock Paper Scissors</h1>
            
            <div className="space-y-6 text-base-content">
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">Game Overview</h2>
                <p>
                  Welcome to our modern take on the classic Rock Paper Scissors game! This web application 
                  brings the timeless hand game to your digital devices with enhanced features, stat tracking, 
                  and online competition.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">How to Play</h2>
                <p>
                  The rules are simple: Rock beats Scissors, Scissors beats Paper, and Paper beats Rock. 
                  Select your move by clicking on one of the three options, and see if you can outsmart 
                  the computer opponent!
                </p>
                <div className="my-4 flex flex-col sm:flex-row justify-center gap-4">
                  <div className="card bg-base-200 p-4 text-center flex-1">
                    <h3 className="font-bold">Rock 👊</h3>
                    <p>Crushes Scissors</p>
                  </div>
                  <div className="card bg-base-200 p-4 text-center flex-1">
                    <h3 className="font-bold">Paper ✋</h3>
                    <p>Covers Rock</p>
                  </div>
                  <div className="card bg-base-200 p-4 text-center flex-1">
                    <h3 className="font-bold">Scissors ✌️</h3>
                    <p>Cuts Paper</p>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">Features</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-semibold">User Authentication:</span> Sign in with your Google account to save your progress and stats.</li>
                  <li><span className="font-semibold">Game Statistics:</span> Track your wins, losses, and draws over time.</li>
                  <li><span className="font-semibold">Multi-Round Games:</span> Play single rounds or challenge yourself with multi-round matches.</li>
                  <li><span className="font-semibold">Leaderboard:</span> See how you stack up against other players.</li>
                  <li><span className="font-semibold">Dark/Light Mode:</span> Choose your preferred visual theme for comfortable gameplay.</li>
                  <li><span className="font-semibold">Responsive Design:</span> Play on any device, from desktop to mobile.</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">Development</h2>
                <p>
                  This game was developed using Next.js, Firebase for authentication and data storage, 
                  and Tailwind CSS with DaisyUI for styling. It demonstrates modern web development 
                  practices and provides a fun, interactive experience for users of all ages.
                </p>
              </section>
              
              <div className="divider"></div>
              
              <div className="text-center">
                <p className="italic">"Rock Paper Scissors isn't just a game of chance—it's a game of psychology and strategy."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
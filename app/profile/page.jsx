'use client';

import { auth, firestore } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    wins: 0,
    losses: 0,
    draws: 0,
    totalGames: 0,
    gameHistory: [],
    winRatio: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        router.push('/signin');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      const userStatsRef = doc(firestore, 'userStats', user.uid);
      const unsubscribe = onSnapshot(userStatsRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const winRatio = data.totalGames > 0 
            ? ((data.wins / data.totalGames) * 100).toFixed(1) 
            : 0;
          
          setStats({
            ...data,
            winRatio
          });
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-base-200 pt-16">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Get recent game results (last 5 games)
  const recentGames = stats.gameHistory?.slice(-5).reverse() || [];

  return (
    <div className="min-h-screen bg-base-200 pt-24 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="card bg-base-100 shadow-xl mt-8">
            <div className="card-body items-center text-center">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-lg">
                  <img src={user?.photoURL || '/default-avatar.png'} alt="Profile" />
                </div>
              </div>
              <h2 className="card-title mt-4 text-2xl">{user?.displayName || 'Player'}</h2>
              <p className="text-sm opacity-70">{user?.email}</p>
              
              <div className="badge badge-primary mt-2">
                {stats.totalGames > 20 ? 'Pro Player' : 
                 stats.totalGames > 10 ? 'Regular Player' : 'Beginner'}
              </div>
              
              <div className="divider"></div>
              
              <div className="flex flex-col gap-2 w-full">
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => router.push('/')}
                >
                  Play Game
                </button>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => router.push('/leaderboard')}
                >
                  View Leaderboard
                </button>
                <button 
                  className="btn btn-ghost btn-sm text-error"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stats Summary */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Game Statistics</h2>
                <div className="stats stats-vertical shadow">
                  <div className="stat">
                    <div className="stat-figure text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div className="stat-title">Total Games</div>
                    <div className="stat-value">{stats.totalGames}</div>
                  </div>
                  
                  <div className="stat">
                    <div className="stat-figure text-success">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path></svg>
                    </div>
                    <div className="stat-title">Wins</div>
                    <div className="stat-value text-success">{stats.wins}</div>
                    <div className="stat-desc">Win Rate: {stats.winRatio}%</div>
                  </div>
                  
                  <div className="stat">
                    <div className="stat-figure text-error">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    <div className="stat-title">Losses</div>
                    <div className="stat-value text-error">{stats.losses}</div>
                  </div>
                  
                  <div className="stat">
                    <div className="stat-figure text-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </div>
                    <div className="stat-title">Draws</div>
                    <div className="stat-value text-secondary">{stats.draws}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Games */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Recent Games</h2>
                {recentGames.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                      <thead>
                        <tr>
                          <th>Result</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentGames.map((game, index) => (
                          <tr key={index}>
                            <td>
                              <div className={`badge ${
                                game.result === 'win' ? 'badge-success' :
                                game.result === 'lose' ? 'badge-error' :
                                'badge-warning'
                              }`}>
                                {game.result === 'win' ? 'WIN' :
                                game.result === 'lose' ? 'LOSS' :
                                'DRAW'}
                              </div>
                            </td>
                            <td>{game.timestamp ? new Date(game.timestamp.seconds * 1000).toLocaleDateString() : 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="alert alert-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>You haven't played any games yet!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

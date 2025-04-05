'use client';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { useTheme } from '@/context/ThemeContext';

export default function Leaderboard() {
  const [stats, setStats] = useState([]);
  const [sortBy, setSortBy] = useState('wins'); // default sort parameter
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  // Fetch stats from Firestore
  const fetchStats = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, 'userStats'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Sort stats based on selected parameter
  const sortedStats = [...stats].sort((a, b) => {
    if (sortBy === 'winRatio') {
      const aRatio = a.totalGames > 0 ? a.wins / a.totalGames : 0;
      const bRatio = b.totalGames > 0 ? b.wins / b.totalGames : 0;
      return bRatio - aRatio;
    }
    // For wins and totalGames, sort descending
    return (b[sortBy] || 0) - (a[sortBy] || 0);
  });

  return (
    <div className="min-h-screen bg-base-200 pt-32 md:pt-24 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Leaderboard</h1>
        <div className="flex justify-center mb-6">
          <select
            className="select select-bordered w-full max-w-xs"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="wins">Total Wins</option>
            <option value="winRatio">Win Ratio</option>
            <option value="totalGames">Total Matches</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center my-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th className="bg-base-200">#</th>
                      <th className="bg-base-200">User</th>
                      <th className="bg-base-200">Total Wins</th>
                      <th className="bg-base-200">Total Matches</th>
                      <th className="bg-base-200">Win Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedStats.map((stat, index) => {
                      const ratio =
                        stat.totalGames > 0
                          ? ((stat.wins / stat.totalGames) * 100).toFixed(2)
                          : '0.00';
                      return (
                        <tr key={stat.id} className="hover">
                          <th>{index + 1}</th>
                          <td>{stat.displayName || stat.id}</td>
                          <td className="text-success font-medium">{stat.wins}</td>
                          <td>{stat.totalGames}</td>
                          <td className="font-medium">{ratio}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {sortedStats.length === 0 && (
                <div className="alert alert-info">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>No players found in the leaderboard.</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

  
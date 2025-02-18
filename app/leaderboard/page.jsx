
'use client';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

export default function Leaderboard() {
  const [stats, setStats] = useState([]);
  const [sortBy, setSortBy] = useState('wins'); // default sort parameter
  const [loading, setLoading] = useState(true);

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
    <div className="p-6 mt-10">
      <h1 className="text-3xl font-bold text-center mb-4">Leaderboard</h1>
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
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="whitespace-nowrap">#</th>
                <th className="whitespace-nowrap">User</th>
                <th className="whitespace-nowrap">Total Wins</th>
                <th className="whitespace-nowrap">Total Matches</th>
                <th className="whitespace-nowrap">Win Ratio</th>
              </tr>
            </thead>
            <tbody>
              {sortedStats.map((stat, index) => {
                const ratio =
                  stat.totalGames > 0
                    ? ((stat.wins / stat.totalGames) * 100).toFixed(2)
                    : '0.00';
                return (
                  <tr key={stat.id}>
                    <th className="whitespace-nowrap">{index + 1}</th>
                    <td className="whitespace-nowrap">{stat.displayName || stat.id}</td>
                    <td className="whitespace-nowrap">{stat.wins}</td>
                    <td className="whitespace-nowrap">{stat.totalGames}</td>
                    <td className="whitespace-nowrap">{ratio}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

  
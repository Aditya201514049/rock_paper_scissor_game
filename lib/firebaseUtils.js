
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';

export const saveStatsToFirestore = async (stats) => {
  const user = auth.currentUser;
  if (user) {
    const userStatsRef = doc(firestore, 'userStats', user.uid);
    
    // Fetch existing stats
    const docSnap = await getDoc(userStatsRef);
    let updatedStats = stats;

    if (docSnap.exists()) {
      // If stats exist, update them
      const existingStats = docSnap.data();
      
      updatedStats = {
        ...existingStats,
        wins: existingStats.wins + stats.wins,
        losses: existingStats.losses + stats.losses,
        draws: existingStats.draws + stats.draws,
        totalGames: existingStats.totalGames + 1,
        // Append the current game history to the existing one
        gameHistory: [...existingStats.gameHistory, ...stats.gameHistory],
      };
    } else {
      // Initialize game history if it doesn't exist
      updatedStats = {
        ...stats,
        gameHistory: stats.gameHistory || [], // If game history is not passed, set it as empty
      };
    }

    // Save the updated stats
    await setDoc(userStatsRef, updatedStats);
  }
};

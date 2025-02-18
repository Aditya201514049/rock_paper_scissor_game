
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';

export const saveStatsToFirestore = async (stats) => {
  const user = auth.currentUser;
  if (!user) return;

  const userStatsRef = doc(firestore, 'userStats', user.uid);
  // Attempt to fetch an existing document
  const docSnap = await getDoc(userStatsRef);
  
  let existingStats = {
    wins: 0,
    losses: 0,
    draws: 0,
    totalGames: 0,
    gameHistory: []
  };

  if (docSnap.exists()) {
    existingStats = docSnap.data();
  }

  // Merge new stats with existing ones
  const updatedStats = {
    wins: existingStats.wins + stats.wins,
    losses: existingStats.losses + stats.losses,
    draws: existingStats.draws + stats.draws,
    totalGames: existingStats.totalGames + 1,
    // Append the new game history entry (or entries) to the existing array
    gameHistory: [...(existingStats.gameHistory || []), ...(stats.gameHistory || [])]
  };

  // Use setDoc with merge option so that document is created if missing
  await setDoc(userStatsRef, updatedStats, { merge: true });
};


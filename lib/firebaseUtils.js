
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';

export const saveStatsToFirestore = async (stats) => {
  const user = auth.currentUser;
  if (!user) return;

  const userStatsRef = doc(firestore, 'userStats', user.uid);
  const docSnap = await getDoc(userStatsRef);

  let existingStats = {
    wins: 0,
    losses: 0,
    draws: 0,
    totalGames: 0,
    gameHistory: [],
    displayName: user.displayName || ''
  };

  if (docSnap.exists()) {
    existingStats = docSnap.data();
  }

  const updatedStats = {
    wins: existingStats.wins + stats.wins,
    losses: existingStats.losses + stats.losses,
    draws: existingStats.draws + stats.draws,
    totalGames: existingStats.totalGames + 1,
    // Merge gameHistory arrays
    gameHistory: [...(existingStats.gameHistory || []), ...(stats.gameHistory || [])],
    // Always update displayName
    displayName: user.displayName || existingStats.displayName || ''
  };

  await setDoc(userStatsRef, updatedStats, { merge: true });
};


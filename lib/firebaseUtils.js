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
      updatedStats = {
        ...docSnap.data(),
        wins: docSnap.data().wins + stats.wins,
        losses: docSnap.data().losses + stats.losses,
        draws: docSnap.data().draws + stats.draws,
        totalGames: docSnap.data().totalGames + 1,
      };
    }

    // Save the updated stats
    await setDoc(userStatsRef, updatedStats);
  }
};

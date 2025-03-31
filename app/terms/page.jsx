'use client';

import { useTheme } from '@/context/ThemeContext';

export default function Terms() {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen bg-base-200 pt-24 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center text-primary mb-8">Terms & Conditions</h1>
            
            <div className="space-y-6 text-base-content">
              <p className="italic text-sm">Last updated: July 10, 2023</p>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the Rock Paper Scissors game, you agree to be bound by these Terms and Conditions. 
                  If you do not agree with any part of these terms, you may not use our services.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">2. User Accounts</h2>
                <p>
                  To use certain features of the game, you may need to sign in with your Google account. 
                  You are responsible for maintaining the confidentiality of your account information and 
                  for all activities that occur under your account.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">3. User Conduct</h2>
                <p>
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Use the game for any unlawful purpose or in violation of these Terms</li>
                  <li>Attempt to gain unauthorized access to other user accounts or game systems</li>
                  <li>Interfere with or disrupt the functionality of the game</li>
                  <li>Use scripts, bots, or other automated means to interact with the game</li>
                  <li>Create multiple accounts to manipulate leaderboard standings</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">4. Intellectual Property</h2>
                <p>
                  All content included in the Rock Paper Scissors game, including but not limited to text, 
                  graphics, logos, icons, and software, is the property of the game's owners and is protected 
                  by copyright and other intellectual property laws.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">5. Limitation of Liability</h2>
                <p>
                  The Rock Paper Scissors game is provided "as is" without warranties of any kind. 
                  In no event shall the game owners be liable for any damages arising from the use of or 
                  inability to use the game.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">6. Game Statistics</h2>
                <p>
                  We collect and store game statistics such as wins, losses, and match history to provide 
                  leaderboard functionality and track individual progress. This information is linked to 
                  your user account and may be visible to other users on the leaderboard.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">7. Modifications to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. Continued use of the game after 
                  any changes constitutes acceptance of the new Terms.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">8. Termination</h2>
                <p>
                  We reserve the right to terminate or suspend access to the game for any user who violates 
                  these Terms, without prior notice.
                </p>
              </section>
              
              <div className="divider"></div>
              
              <p className="text-center text-sm">
                By using the Rock Paper Scissors game, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
'use client';

import { useTheme } from '@/context/ThemeContext';

export default function Privacy() {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen bg-base-200 pt-24 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center text-primary mb-8">Privacy Policy</h1>
            
            <div className="space-y-6 text-base-content">
              <p className="italic text-sm">Last updated: July 10, 2023</p>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">1. Introduction</h2>
                <p>
                  This Privacy Policy explains how we collect, use, and protect your personal information 
                  when you use our Rock Paper Scissors game. We respect your privacy and are committed to 
                  protecting your personal data.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">2. Information We Collect</h2>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">2.1 Account Information</h3>
                  <p>
                    When you sign in with Google, we receive basic profile information such as:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Your name</li>
                    <li>Email address</li>
                    <li>Profile picture</li>
                    <li>Google user ID</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-4">2.2 Game Data</h3>
                  <p>
                    We collect and store data related to your game activity, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Game results (wins, losses, draws)</li>
                    <li>Game history</li>
                    <li>Date and time of games played</li>
                  </ul>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">3. How We Use Your Information</h2>
                <p>
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>To provide and maintain our game service</li>
                  <li>To authenticate your identity and maintain your user account</li>
                  <li>To track your game statistics and display them on your profile</li>
                  <li>To create and maintain leaderboards showing top players</li>
                  <li>To improve the game based on usage patterns</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">4. Data Storage and Security</h2>
                <p>
                  All data is stored in Google Firebase, which provides secure cloud storage and 
                  authentication services. We implement appropriate security measures to prevent 
                  unauthorized access, disclosure, or alteration of your information.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">5. Information Sharing</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties. 
                  Your game statistics may be visible to other users on the leaderboard, but this is limited 
                  to your display name and game performance metrics.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">6. Your Data Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Access your personal data</li>
                  <li>Request correction or deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Request restriction of processing your data</li>
                </ul>
                <p className="mt-3">
                  To exercise any of these rights, please contact us through the provided contact information.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">7. Children's Privacy</h2>
                <p>
                  Our game is not intended for children under 13 years of age. We do not knowingly collect 
                  personal information from children under 13. If you are a parent or guardian and believe 
                  your child has provided us with personal information, please contact us.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-3 text-secondary">8. Changes to This Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "last updated" date.
                </p>
              </section>
              
              <div className="divider"></div>
              
              <p className="text-center text-sm">
                By using the Rock Paper Scissors game, you consent to our Privacy Policy and agree to its terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
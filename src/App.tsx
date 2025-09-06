import React from "react";
import { LoginScreen } from "./components/login-screen";
import { GameScreen } from "./components/game-screen";
import { GameProvider } from "./context/game-context";

function App() {
  // Check if user was previously logged in
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    return localStorage.getItem('starClicker_isLoggedIn') === 'true';
  });
  const [showGameAfterDelay, setShowGameAfterDelay] = React.useState(() => {
    return localStorage.getItem('starClicker_isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    // Set login state
    setIsLoggedIn(true);
    localStorage.setItem('starClicker_isLoggedIn', 'true');
    
    // Open Telegram bot URL
    window.open('https://t.me/@FreeTgStarsNew_bot', '_blank');
    
    // Simulate delay after Telegram authentication
    setTimeout(() => {
      setShowGameAfterDelay(true);
    }, 10000); // 10 seconds delay
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <GameProvider>
        {!isLoggedIn && <LoginScreen onLogin={handleLogin} />}
        {isLoggedIn && !showGameAfterDelay && (
          <div className="text-center p-8 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Authenticating...</h2>
            <p className="mb-4">Please follow the instructions in the Telegram bot.</p>
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          </div>
        )}
        {showGameAfterDelay && <GameScreen />}
      </GameProvider>
    </div>
  );
}

export default App;
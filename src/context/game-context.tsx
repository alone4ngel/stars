import React from "react";

interface GameContextType {
  clicks: number;
  stars: number;
  warnings: number;
  isBlocked: boolean;
  activeBoosts: Boost[];
  addClicks: (amount: number) => void;
  resetClicks: () => void;
  withdrawStars: (amount: number) => void;
  addWarning: () => void;
  purchaseBoost: (boost: Boost) => void;
}

export interface Boost {
  id: string;
  name: string;
  description: string;
  multiplier: number;
  duration: number; // in seconds
  cost: number;
  active: boolean;
}

const GameContext = React.createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state from localStorage
  const loadSavedState = () => {
    try {
      const savedClicks = localStorage.getItem('starClicker_clicks');
      const savedWarnings = localStorage.getItem('starClicker_warnings');
      const savedIsBlocked = localStorage.getItem('starClicker_isBlocked');
      
      return {
        clicks: savedClicks ? parseInt(savedClicks) : 0,
        warnings: savedWarnings ? parseInt(savedWarnings) : 0,
        isBlocked: savedIsBlocked === 'true'
      };
    } catch (error) {
      console.error("Error loading saved state:", error);
      return { clicks: 0, warnings: 0, isBlocked: false };
    }
  };

  const savedState = loadSavedState();
  
  const [clicks, setClicks] = React.useState(savedState.clicks);
  const [stars, setStars] = React.useState(Math.floor(savedState.clicks / 1000));
  const [warnings, setWarnings] = React.useState(savedState.warnings);
  const [isBlocked, setIsBlocked] = React.useState(savedState.isBlocked);
  const [activeBoosts, setActiveBoosts] = React.useState<Boost[]>([]);

  // Save state to localStorage when it changes
  React.useEffect(() => {
    try {
      localStorage.setItem('starClicker_clicks', clicks.toString());
      localStorage.setItem('starClicker_warnings', warnings.toString());
      localStorage.setItem('starClicker_isBlocked', isBlocked.toString());
    } catch (error) {
      console.error("Error saving state:", error);
    }
  }, [clicks, warnings, isBlocked]);

  // Calculate stars based on clicks (1000 clicks = 1 star)
  React.useEffect(() => {
    const calculatedStars = Math.floor(clicks / 1000);
    setStars(calculatedStars);
  }, [clicks]);

  const addClicks = (amount: number) => {
    if (isBlocked) return;
    
    // Apply boost multipliers if active
    let multipliedAmount = amount;
    activeBoosts.forEach(boost => {
      if (boost.active) {
        multipliedAmount *= boost.multiplier;
      }
    });
    
    setClicks(prev => prev + multipliedAmount);
  };

  const resetClicks = () => {
    setClicks(0);
  };

  const withdrawStars = (amount: number) => {
    const clicksToDeduct = amount * 1000;
    if (clicks >= clicksToDeduct) {
      setClicks(prev => prev - clicksToDeduct);
    }
  };

  const addWarning = () => {
    if (warnings < 10) {
      setWarnings(prev => prev + 1);
    }
    
    if (warnings + 1 >= 10) {
      setIsBlocked(true);
    }
  };

  const purchaseBoost = (boost: Boost) => {
    if (clicks >= boost.cost) {
      // Deduct the cost
      setClicks(prev => prev - boost.cost);
      
      // Add the boost to active boosts
      const newBoost = { ...boost, active: true };
      setActiveBoosts(prev => [...prev, newBoost]);
      
      // Set a timer to deactivate the boost
      setTimeout(() => {
        setActiveBoosts(prev => 
          prev.filter(b => b.id !== boost.id)
        );
      }, boost.duration * 1000);
    }
  };

  const value = {
    clicks,
    stars,
    warnings,
    isBlocked,
    activeBoosts,
    addClicks,
    resetClicks,
    withdrawStars,
    addWarning,
    purchaseBoost
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
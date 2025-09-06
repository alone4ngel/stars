import React from "react";
import { Button, Card, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, useAnimation } from "framer-motion";
import { StarButton } from "./star-button";
import { WarningModal } from "./warning-modal";
import { WithdrawModal } from "./withdraw-modal";
import { BoostsModal } from "./boosts-modal";
import { useGame } from "../context/game-context";

export const GameScreen: React.FC = () => {
  const { clicks, stars, warnings, isBlocked, activeBoosts, addClicks, addWarning } = useGame();
  const [clickTimes, setClickTimes] = React.useState<number[]>([]);
  const [showWarning, setShowWarning] = React.useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = React.useState(false);
  const [showBoostsModal, setShowBoostsModal] = React.useState(false);
  
  const controls = useAnimation();
  
  const handleStarClick = () => {
    if (isBlocked) return;
    
    // Record click time for rate limiting
    const now = Date.now();
    const newClickTimes = [...clickTimes, now].filter(time => now - time < 1000);
    setClickTimes(newClickTimes);
    
    // Check if clicking too fast (more than 24 clicks per second) - changed from 10
    if (newClickTimes.length > 24) {
      addWarning();
      setShowWarning(true);
      return;
    }
    
    // Add click and animate
    addClicks(1);
    controls.start({
      scale: [1, 0.95, 1],
      transition: { duration: 0.2 }
    });
  };

  return (
    <div className="w-full max-w-4xl px-4 py-8">
      <div className="flex flex-col items-center">
        {/* Stats Bar */}
        <Card className="w-full mb-8 bg-content1/80 backdrop-blur-md border border-white/10">
          <div className="flex flex-wrap justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:mouse-pointer-click" className="text-primary" />
              <span className="font-semibold text-black">{clicks.toLocaleString()} Clicks</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Icon icon="lucide:star" className="text-secondary" />
              <span className="font-semibold text-black">{stars.toLocaleString()} Stars</span>
            </div>
            
            {warnings > 0 && (
              <div className="flex items-center gap-2">
                <Icon icon="lucide:alert-triangle" className="text-warning" />
                <span className="font-semibold text-black">Warnings: {warnings}/10</span>
              </div>
            )}
            
            {activeBoosts.length > 0 && (
              <div className="flex items-center gap-2">
                <Icon icon="lucide:zap" className="text-success" />
                <span className="font-semibold text-black">Boosts: {activeBoosts.length} active</span>
              </div>
            )}
          </div>
        </Card>
        
        {/* Main Star Button with enhanced background effect */}
        <div className="mb-12 relative">
          {/* Background glow effect */}
          <div className="absolute -inset-10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl -z-20"></div>
          
          <motion.div animate={controls}>
            <StarButton onClick={handleStarClick} disabled={isBlocked} />
          </motion.div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Tooltip content="Withdraw your stars (min 500,000 clicks required)">
            <Button
              color="secondary"
              size="lg"
              startContent={<Icon icon="lucide:wallet" />}
              onPress={() => setShowWithdrawModal(true)}
              className="font-medium text-on-dark"
            >
              Withdraw Stars
            </Button>
          </Tooltip>
          
          <Tooltip content="Purchase boosts to increase your clicking power">
            <Button
              color="primary"
              size="lg"
              startContent={<Icon icon="lucide:zap" />}
              onPress={() => setShowBoostsModal(true)}
              className="font-medium text-on-dark"
            >
              Boosts & Upgrades
            </Button>
          </Tooltip>
        </div>
      </div>
      
      {/* Modals remain unchanged */}
      <WarningModal 
        isOpen={showWarning} 
        onClose={() => setShowWarning(false)} 
        warningCount={warnings}
      />
      
      <WithdrawModal 
        isOpen={showWithdrawModal} 
        onClose={() => setShowWithdrawModal(false)}
        clicks={clicks}
      />
      
      <BoostsModal 
        isOpen={showBoostsModal} 
        onClose={() => setShowBoostsModal(false)}
      />
    </div>
  );
};
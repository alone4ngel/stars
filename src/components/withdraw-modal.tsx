import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useGame } from "../context/game-context";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  clicks: number;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose, clicks }) => {
  const { withdrawStars } = useGame();
  const [amount, setAmount] = React.useState<number>(500);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const minClicks = 500000;
  const clicksToStars = 1000; // 1000 clicks = 1 star
  const maxWithdraw = Math.floor(clicks / clicksToStars);
  const canWithdraw = clicks >= minClicks;
  
  const handleWithdraw = () => {
    if (canWithdraw && amount > 0 && amount <= maxWithdraw) {
      withdrawStars(amount);
      setShowSuccess(true);
    }
  };
  
  const handleClose = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            {!showSuccess ? (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:wallet" className="text-secondary text-xl" />
                    Withdraw Stars
                  </div>
                </ModalHeader>
                <ModalBody>
                  {canWithdraw ? (
                    <>
                      <p className="mb-4 text-black">
                        You have {Math.floor(clicks / clicksToStars)} stars available to withdraw.
                      </p>
                      <Input
                        type="number"
                        label="Amount to withdraw"
                        value={amount.toString()}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        min={1}
                        max={maxWithdraw}
                        endContent={
                          <div className="pointer-events-none flex items-center">
                            <Icon icon="lucide:star" className="text-secondary" />
                          </div>
                        }
                      />
                      <p className="text-small text-black mt-2">
                        This will cost {amount * clicksToStars} clicks.
                      </p>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "reverse", 
                          duration: 1.5 
                        }}
                        className="text-5xl mb-4 text-foreground-400"
                      >
                        <Icon icon="lucide:lock" />
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-2 text-black">Not Enough Clicks</h3>
                      <p className="text-black">
                        You need at least 500,000 clicks to withdraw stars. 500000 clicks = 500 stars.
                      </p>
                      <p className="text-black mt-2">
                        Current: {clicks.toLocaleString()} / 500,000
                      </p>
                      <div className="w-full bg-default-100 rounded-full h-2 mt-4">
                        <div 
                          className="bg-secondary h-2 rounded-full" 
                          style={{ width: `${Math.min(100, (clicks / minClicks) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button 
                    color="secondary" 
                    onPress={handleWithdraw}
                    isDisabled={!canWithdraw || amount <= 0 || amount > maxWithdraw}
                  >
                    Withdraw
                  </Button>
                </ModalFooter>
              </>
            ) : (
              <>
                <ModalHeader className="flex flex-col gap-1 text-success">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0, -10, 0]
                      }}
                      transition={{ duration: 1 }}
                    >
                      <Icon icon="lucide:check-circle" className="text-success text-2xl" />
                    </motion.div>
                    Success!
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="text-center py-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                      }}
                      className="text-6xl mb-6 text-secondary"
                    >
                      <Icon icon="lucide:star" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3 text-black">Stars Withdrawal Successful!</h3>
                    <p className="text-black">
                      Your {amount} stars will be credited to your account within 48 hours due to high demand.
                    </p>
                    <p className="text-black mt-4 text-sm">
                      Thank you for your patience.
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="success" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Badge } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useGame, Boost } from "../context/game-context";

interface BoostsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BoostsModal: React.FC<BoostsModalProps> = ({ isOpen, onClose }) => {
  const { clicks, activeBoosts, purchaseBoost } = useGame();
  
  const availableBoosts: Boost[] = [
    {
      id: "double",
      name: "Double Clicks",
      description: "Double your clicks for 30 seconds",
      multiplier: 2,
      duration: 30,
      cost: 1000,
      active: false
    },
    {
      id: "triple",
      name: "Triple Clicks",
      description: "Triple your clicks for 15 seconds",
      multiplier: 3,
      duration: 15,
      cost: 5000,
      active: false
    },
    {
      id: "mega",
      name: "Mega Boost",
      description: "10x your clicks for 5 seconds",
      multiplier: 10,
      duration: 5,
      cost: 20000,
      active: false
    },
    {
      id: "ultra",
      name: "Ultra Boost",
      description: "50x your clicks for 3 seconds",
      multiplier: 50,
      duration: 3,
      cost: 100000,
      active: false
    }
  ];
  
  // Check if a boost is already active
  const isBoostActive = (id: string) => {
    return activeBoosts.some(boost => boost.id === id);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} backdrop="blur" size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:zap" className="text-primary text-xl" />
                Boosts & Upgrades
              </div>
            </ModalHeader>
            <ModalBody>
              <p className="mb-4 text-black">
                Purchase temporary boosts to increase your clicking power! You have <span className="font-semibold">{clicks.toLocaleString()}</span> clicks available.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableBoosts.map((boost) => {
                  const isActive = isBoostActive(boost.id);
                  const canAfford = clicks >= boost.cost;
                  
                  return (
                    <Card 
                      key={boost.id} 
                      className={`border ${isActive ? 'border-success' : canAfford ? 'border-primary/30' : 'border-default-200/50'}`}
                    >
                      <CardBody className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold text-black">{boost.name}</h3>
                              {isActive && (
                                <Badge color="success" variant="flat" size="sm">Active</Badge>
                              )}
                            </div>
                            <p className="text-black text-sm mt-1">{boost.description}</p>
                          </div>
                          <motion.div
                            whileHover={{ rotate: 15 }}
                            className={`text-2xl ${isActive ? 'text-success' : 'text-primary'}`}
                          >
                            <Icon icon={`lucide:${boost.id === 'ultra' ? 'flame' : boost.id === 'mega' ? 'zap' : 'activity'}`} />
                          </motion.div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-1 text-sm text-black">
                            <Icon icon="lucide:clock" className="text-xs" />
                            {boost.duration}s
                          </div>
                          <div className="flex items-center gap-1 text-sm text-black">
                            <span>{boost.cost.toLocaleString()}</span>
                            <Icon icon="lucide:mouse-pointer-click" className="text-xs" />
                          </div>
                        </div>
                        
                        <Button
                          color={isActive ? "success" : canAfford ? "primary" : "default"}
                          variant={isActive ? "flat" : "solid"}
                          fullWidth
                          className="mt-3"
                          isDisabled={isActive || !canAfford}
                          onPress={() => purchaseBoost(boost)}
                        >
                          {isActive ? "Active" : canAfford ? "Purchase" : "Not enough clicks"}
                        </Button>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
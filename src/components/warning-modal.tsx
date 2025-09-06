import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  warningCount: number;
}

export const WarningModal: React.FC<WarningModalProps> = ({ isOpen, onClose, warningCount }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-warning">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 0.5,
                    repeat: 3,
                    ease: "easeInOut"
                  }}
                >
                  <Icon icon="lucide:alert-triangle" className="text-warning text-2xl" />
                </motion.div>
                Warning!
              </div>
            </ModalHeader>
            <ModalBody>
              <p className="text-black">You're clicking too fast! The system has detected suspicious activity.</p>
              <p className="font-semibold mt-2 text-black">
                Warning {warningCount} of 10
              </p>
              {warningCount >= 8 && (
                <p className="text-danger mt-2">
                  <Icon icon="lucide:alert-circle" className="inline mr-1" />
                  You're close to being blocked! Slow down your clicking.
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="warning" onPress={onClose}>
                I Understand
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
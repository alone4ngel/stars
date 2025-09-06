import React from "react";
import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { StarIcon } from "./star-icon";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md px-4"
    >
      <Card className="bg-content1 shadow-xl border border-white/10">
        <CardBody className="flex flex-col items-center gap-6 p-8">
          {/* Updated star animation to match game screen */}
          <motion.div
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.03, 1, 1.03, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-32 h-32 mb-4 relative"
          >
            {/* Background glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-xl -z-10"></div>
            
            <StarIcon className="w-full h-full neon-glow" />
          </motion.div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-starBlue to-starPurple bg-clip-text text-transparent">
              Star Clicker
            </h1>
            <p className="text-black mb-6">
              Collect stars and earn rewards!
            </p>
          </div>
        </CardBody>
        
        <CardFooter className="flex justify-center pb-8 pt-0">
          <Button 
            color="primary"
            size="lg"
            onPress={onLogin}
            startContent={<Icon icon="logos:telegram" width={24} />}
            className="font-medium text-base"
          >
            Login with Telegram
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
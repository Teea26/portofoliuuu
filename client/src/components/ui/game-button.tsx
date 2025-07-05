import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GameButtonProps extends ButtonProps {
  variant?: "game" | "default";
}

const GameButton = forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ className, variant = "game", children, ...props }, ref) => {
    const gameStyles = variant === "game" ? 
      "rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95" :
      "";

    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        <Button
          ref={ref}
          className={cn(gameStyles, className)}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);

GameButton.displayName = "GameButton";

export default GameButton;

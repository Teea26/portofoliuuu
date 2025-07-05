import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Card, CardProps } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GameCardProps extends CardProps {
  children: React.ReactNode;
}

const GameCard = forwardRef<HTMLDivElement, GameCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card
          ref={ref}
          className={cn(
            "rounded-3xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl",
            className
          )}
          {...props}
        >
          {children}
        </Card>
      </motion.div>
    );
  }
);

GameCard.displayName = "GameCard";

export default GameCard;

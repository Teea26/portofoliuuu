import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  value: number;
  colorClass: string;
  delay?: number;
  showLabel?: boolean;
}

export default function SkillBar({ 
  name, 
  value, 
  colorClass, 
  delay = 0, 
  showLabel = true 
}: SkillBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="skill-bar-container">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-700">{name}</span>
          <span className="font-bold" style={{ color: `var(--${colorClass.split('-')[1]}-game)` }}>
            {value}/100
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          className={`h-3 rounded-full bg-gradient-to-r ${colorClass}`}
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${value}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

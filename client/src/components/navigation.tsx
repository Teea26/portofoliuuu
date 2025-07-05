import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Gamepad2 } from "lucide-react";
import GameButton from "@/components/ui/game-button";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#home", label: "Acasă", icon: "♪", color: "bg-pink-game" },
    { href: "#about", label: "Despre", icon: "◊", color: "bg-mint-game" },
    { href: "#portfolio", label: "Portofoliu", icon: "▲", color: "bg-sky-game" },
    { href: "#skills", label: "Abilități", icon: "●", color: "bg-peach-game" },
    { href: "#contact", label: "Contact", icon: "◆", color: "bg-lavender-game" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b-4 border-pink-game"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl font-bold text-pink-game flex items-center">
              <Gamepad2 className="mr-2" />
              creator.ro
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <GameButton
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  variant="game"
                  className={`${item.color} text-white font-semibold`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </GameButton>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <GameButton
              onClick={() => setIsOpen(!isOpen)}
              variant="game"
              className="bg-pink-game text-white"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </GameButton>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white rounded-b-2xl border-t border-gray-200 shadow-lg"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <GameButton
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  variant="game"
                  className={`${item.color} text-white font-semibold w-full justify-start`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </GameButton>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

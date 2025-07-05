import { motion } from "framer-motion";
import { Gamepad2, Heart } from "lucide-react";
import GameButton from "@/components/ui/game-button";

export default function Footer() {
  const socialLinks = [
    { platform: "Twitter", icon: "🐦", color: "text-pink-game hover:text-pink-400" },
    { platform: "Instagram", icon: "📸", color: "text-mint-game hover:text-green-400" },
    { platform: "LinkedIn", icon: "💼", color: "text-sky-game hover:text-blue-400" },
    { platform: "YouTube", icon: "📺", color: "text-peach-game hover:text-orange-400" },
  ];

  const quickLinks = ["Home", "About", "Portfolio", "Skills", "Contact"];

  const scrollToSection = (section: string) => {
    const element = document.querySelector(`#${section.toLowerCase()}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-left">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-pink-game mb-4 flex items-center justify-center md:justify-start"
            >
              <Gamepad2 className="mr-2" />
              CreatorGame
            </motion.div>
            <p className="text-gray-300 mb-4">
              Making the digital world more colorful, one creative project at a time!
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.platform}
                  href="#"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className={`${social.color} transition-colors text-2xl`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-bold text-lg mb-4 text-yellow-game">Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <motion.button
                  key={link}
                  onClick={() => scrollToSection(link === "Portfolio" ? "portfolio" : link)}
                  whileHover={{ x: 5 }}
                  className="block text-gray-300 hover:text-white transition-colors mx-auto"
                >
                  {link}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="text-center md:text-right">
            <h3 className="font-bold text-lg mb-4 text-lavender-game">Let's Create!</h3>
            <p className="text-gray-300 mb-4">
              Have an amazing idea? Let's bring it to life together!
            </p>
            <GameButton
              onClick={scrollToContact}
              variant="game"
              className="bg-gradient-to-r from-pink-game to-lavender-game text-white font-semibold"
            >
              🚀 Start Project
            </GameButton>
          </div>
        </div>

        <hr className="border-gray-600 mb-6" />

        <div className="text-center text-gray-400">
          <p className="flex items-center justify-center">
            &copy; 2024 CreatorGame Portfolio. Made with{" "}
            <Heart className="text-pink-game mx-2" size={16} /> and lots of creativity!
          </p>
          <p className="mt-2 text-sm">Designed to inspire and built to impress ✨</p>
        </div>
      </div>
    </footer>
  );
}

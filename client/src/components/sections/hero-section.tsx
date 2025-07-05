import { motion } from "framer-motion";
import { Play, Download, Heart, Star, Gem } from "lucide-react";
import GameButton from "@/components/ui/game-button";

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <div className="inline-block animate-float">
            <div className="w-48 h-48 rounded-full border-8 border-white shadow-2xl mx-auto bg-gradient-to-br from-pink-game to-lavender-game flex items-center justify-center text-6xl">
              🎮
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
        >
          Bun venit în lumea mea{" "}
          <span className="text-pink-game animate-pulse-slow">creativă</span>{" "}
          <span className="text-mint-game">indie</span>
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
        >
          Salut! Sunt un creator de conținut care iubește să transforme ideile în magie digitală.
          Alătură-te acestei călătorii creative pline de culoare și inspirație!
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12"
        >
          <GameButton
            variant="game"
            size="lg"
            className="bg-gradient-to-r from-pink-game to-peach-game text-white font-bold shadow-lg"
          >
            <Play className="mr-2" size={20} />
            Începe Aventura
          </GameButton>
          <GameButton
            variant="game"
            size="lg"
            className="bg-gradient-to-r from-sky-game to-lavender-game text-white font-bold shadow-lg"
          >
            <Download className="mr-2" size={20} />
            Descarcă CV
          </GameButton>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex justify-center space-x-8"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            <Heart className="text-4xl text-pink-game" size={40} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          >
            <Star className="text-4xl text-yellow-game" size={40} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          >
            <Gem className="text-4xl text-lavender-game" size={40} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

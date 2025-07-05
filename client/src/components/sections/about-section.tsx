import { motion } from "framer-motion";
import { Palette, MapPin, Trophy, Heart, BarChart3, Crown, Rocket, Medal } from "lucide-react";
import GameCard from "@/components/ui/game-card";
import SkillBar from "@/components/ui/skill-bar";

export default function AboutSection() {
  const stats = [
    { name: "Creativitate", value: 95, color: "from-pink-game to-peach-game" },
    { name: "Abilități Tehnice", value: 88, color: "from-sky-game to-lavender-game" },
    { name: "Comunicare", value: 92, color: "from-mint-game to-green-400" },
    { name: "Rezolvare Probleme", value: 90, color: "from-yellow-game to-orange-400" },
  ];

  const achievements = [
    { icon: Crown, label: "Regele Conținutului", color: "from-yellow-game to-orange-400" },
    { icon: Rocket, label: "Inovator Digital", color: "from-pink-game to-red-400" },
    { icon: Medal, label: "Colaborator", color: "from-lavender-game to-purple-400" },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-br from-mint-game/20 to-sky-game/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Despre Acest Creator
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block ml-3"
            >
              ◊
            </motion.span>
          </h2>
          <p className="text-xl text-gray-600">Descoperă persoana din spatele creativității!</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Character Info Card */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GameCard className="bg-white border-4 border-pink-game/20">
              <div className="text-center mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-block bg-gradient-to-r from-pink-game to-peach-game text-white px-6 py-2 rounded-full font-bold text-lg mb-4"
                >
                  Creator Nivel 25
                </motion.div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center">
                  <Palette className="text-2xl text-pink-game mr-4" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Specializare</h3>
                    <p className="text-gray-600">Creare de Conținut Digital</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="text-2xl text-mint-game mr-4" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Locația de Bază</h3>
                    <p className="text-gray-600">Regatul Digital</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Trophy className="text-2xl text-yellow-game mr-4" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Realizare</h3>
                    <p className="text-gray-600">Maestru al Narațiunii Vizuale</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Heart className="text-2xl text-red-400 mr-4" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Pasiune</h3>
                    <p className="text-gray-600">Aducerea ideilor la viață prin pixeli și cod</p>
                  </div>
                </div>
              </div>
            </GameCard>
          </motion.div>

          {/* Stats Panel */}
          <div className="space-y-6">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GameCard className="bg-white border-4 border-sky-game/20">
                <h3 className="font-bold text-2xl text-gray-800 mb-4 text-center">
                  Statistici Creator
                  <BarChart3 className="text-sky-game ml-2 inline" />
                </h3>

                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <SkillBar
                      key={stat.name}
                      name={stat.name}
                      value={stat.value}
                      colorClass={stat.color}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </GameCard>
            </motion.div>

            {/* Achievement Badges */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <GameCard className="bg-white border-4 border-lavender-game/20">
                <h3 className="font-bold text-xl text-gray-800 mb-4 text-center">
                  Realizări Recente
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.label}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="text-center"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                        <achievement.icon className="text-white text-xl" />
                      </div>
                      <p className="text-xs font-semibold text-gray-600">{achievement.label}</p>
                    </motion.div>
                  ))}
                </div>
              </GameCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

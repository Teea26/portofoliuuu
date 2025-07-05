import { motion } from "framer-motion";
import { TreePine, Settings, Palette, Video, PaintbrushVertical, Camera, Code, Lightbulb, Users, TrendingUp, Rocket, Brain, Smartphone, Podcast } from "lucide-react";
import GameCard from "@/components/ui/game-card";
import SkillBar from "@/components/ui/skill-bar";

export default function SkillsSection() {
  const technicalSkills = [
    { name: "Editare Video", value: 90, level: 9, icon: Video, color: "from-pink-game to-red-400" },
    { name: "Design Grafic", value: 85, level: 8, icon: PaintbrushVertical, color: "from-mint-game to-green-400" },
    { name: "Fotografie", value: 75, level: 7, icon: Camera, color: "from-sky-game to-blue-400" },
    { name: "Dezvoltare Web", value: 65, level: 6, icon: Code, color: "from-lavender-game to-purple-400" },
  ];

  const creativeSkills = [
    { name: "Gândire Creativă", value: 98, level: 10, icon: Lightbulb, color: "from-yellow-game to-orange-400" },
    { name: "Povestire", value: 92, level: 9, icon: Users, color: "from-pink-game to-red-400" },
    { name: "Strategie Brand", value: 80, level: 8, icon: TrendingUp, color: "from-mint-game to-green-400" },
    { name: "Management Proiecte", value: 78, level: 7, icon: Rocket, color: "from-sky-game to-blue-400" },
  ];

  const learningGoals = [
    { icon: Brain, label: "Integrare AI", description: "Stăpânirea instrumentelor AI pentru creativitate îmbunătățită", color: "from-purple-400 to-lavender-game" },
    { icon: Smartphone, label: "Design Mobile-First", description: "Optimizarea conținutului pentru experiențe mobile", color: "from-green-400 to-mint-game" },
    { icon: Podcast, label: "Conținut Audio", description: "Extinderea în podcast-uri și narațiuni audio", color: "from-orange-400 to-peach-game" },
  ];

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(level / 2) ? "text-yellow-game" : "text-gray-300"}>
        ⭐
      </span>
    ));
  };

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-br from-lavender-game/20 to-pink-game/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Abilități & Power-Ups
            <TreePine className="text-green-500 ml-3 inline" />
          </h2>
          <p className="text-xl text-gray-600">
            Urcă în nivel cu mine pe măsură ce stăpânesc abilități noi în universul creativ!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills Panel */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GameCard className="bg-white border-4 border-sky-game/20">
              <h3 className="font-bold text-2xl text-gray-800 mb-6 text-center">
                <Settings className="text-sky-game mr-3 inline" />
                Abilități Tehnice
              </h3>

              <div className="space-y-6">
                {technicalSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="skill-item p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <skill.icon className="text-2xl mr-3" style={{ color: `var(--${skill.color.split('-')[1]}-game)` }} />
                        <span className="font-semibold text-gray-700">{skill.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold mr-2" style={{ color: `var(--${skill.color.split('-')[1]}-game)` }}>
                          Level {skill.level}
                        </span>
                        <div className="flex space-x-1">
                          {renderStars(skill.level)}
                        </div>
                      </div>
                    </div>
                    <SkillBar
                      name=""
                      value={skill.value}
                      colorClass={skill.color}
                      showLabel={false}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>{skill.level >= 8 ? "Expert" : skill.level >= 6 ? "Avansat" : "Intermediar"}</span>
                      <span>{skill.value}/100 XP</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GameCard>
          </motion.div>

          {/* Creative Skills Panel */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GameCard className="bg-white border-4 border-peach-game/20">
              <h3 className="font-bold text-2xl text-gray-800 mb-6 text-center">
                <Palette className="text-peach-game mr-3 inline" />
                Puteri Creative
              </h3>

              <div className="space-y-6">
                {creativeSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="skill-item p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <skill.icon className="text-2xl mr-3" style={{ color: `var(--${skill.color.split('-')[1]}-game)` }} />
                        <span className="font-semibold text-gray-700">{skill.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold mr-2" style={{ color: `var(--${skill.color.split('-')[1]}-game)` }}>
                          Level {skill.level}
                        </span>
                        <div className="flex space-x-1">
                          {renderStars(skill.level)}
                        </div>
                      </div>
                    </div>
                    <SkillBar
                      name=""
                      value={skill.value}
                      colorClass={skill.color}
                      showLabel={false}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>{skill.level >= 9 ? "Maestru" : skill.level >= 8 ? "Expert" : "Avansat"}</span>
                      <span>{skill.value}/100 XP</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GameCard>
          </motion.div>
        </div>

        {/* Learning Goals */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <GameCard className="bg-white border-4 border-yellow-game/20 max-w-4xl mx-auto">
            <h3 className="font-bold text-2xl text-gray-800 mb-6">
              ♦ Obiective Viitoare
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {learningGoals.map((goal, index) => (
                <motion.div
                  key={goal.label}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${goal.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <goal.icon className="text-white text-xl" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{goal.label}</h4>
                  <p className="text-gray-600 text-sm">{goal.description}</p>
                </motion.div>
              ))}
            </div>
          </GameCard>
        </motion.div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, Clock, Share, User, MessageSquare, Gamepad2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GameCard from "@/components/ui/game-card";
import GameButton from "@/components/ui/game-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Numele trebuie să aibă cel puțin 2 caractere"),
  email: z.string().email("Te rog să introduci o adresă de email validă"),
  projectType: z.string().min(1, "Te rog să selectezi un tip de proiect"),
  message: z.string().min(10, "Mesajul trebuie să aibă cel puțin 10 caractere"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Mesaj trimis! ♦✨",
        description: "Mulțumesc pentru mesaj! O să îți răspund curând!",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Ceva nu a mers bine. Te rog să încerci din nou.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { platform: "Twitter", icon: "♪", color: "from-blue-500 to-blue-600" },
    { platform: "Instagram", icon: "◊", color: "from-pink-500 to-purple-600" },
    { platform: "LinkedIn", icon: "▲", color: "from-blue-600 to-blue-800" },
    { platform: "YouTube", icon: "●", color: "from-red-500 to-red-600" },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Să Creăm Împreună
            <Send className="text-sky-game ml-3 inline" />
          </h2>
          <p className="text-xl text-gray-600">
            Gata să creezi ceva incredibil? Să ne unităm forțele și să facem magie!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GameCard className="bg-gradient-to-br from-pink-game/10 to-lavender-game/10 border-4 border-pink-game/20">
              <h3 className="font-bold text-2xl text-gray-800 mb-6 text-center">
                <Mail className="text-pink-game mr-3 inline" />
                Trimite un Mesaj
              </h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700 font-semibold">
                          <User className="text-pink-game mr-2" size={16} />
                          Your Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your amazing name"
                            className="border-2 border-gray-200 rounded-2xl focus:border-pink-game"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700 font-semibold">
                          <Mail className="text-sky-game mr-2" size={16} />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="your.email@example.com"
                            className="border-2 border-gray-200 rounded-2xl focus:border-sky-game"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700 font-semibold">
                          <Gamepad2 className="text-mint-game mr-2" size={16} />
                          Project Type
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-2 border-gray-200 rounded-2xl focus:border-mint-game">
                              <SelectValue placeholder="Choose your quest type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="video">Video Content Creation</SelectItem>
                            <SelectItem value="design">Graphic Design & Branding</SelectItem>
                            <SelectItem value="social">Social Media Strategy</SelectItem>
                            <SelectItem value="web">Web Development</SelectItem>
                            <SelectItem value="consultation">Creative Consultation</SelectItem>
                            <SelectItem value="other">Something Amazing & Different</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700 font-semibold">
                          <MessageSquare className="text-peach-game mr-2" size={16} />
                          Your Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={5}
                            placeholder="Tell me about your creative vision and how we can bring it to life together!"
                            className="border-2 border-gray-200 rounded-2xl focus:border-peach-game resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <GameButton
                    type="submit"
                    variant="game"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-game to-lavender-game text-white font-bold shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2"
                        >
                          ⚡
                        </motion.div>
                        Sending Magic...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">✨</span>
                        Send Quest Request
                      </>
                    )}
                  </GameButton>
                </form>
              </Form>
            </GameCard>
          </motion.div>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            {/* Contact Details */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GameCard className="bg-gradient-to-br from-sky-game/10 to-mint-game/10 border-4 border-sky-game/20">
                <h3 className="font-bold text-2xl text-gray-800 mb-6 text-center">
                  📍 Find Me Here
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-game to-red-400 rounded-full flex items-center justify-center mr-4">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">hello@creativegame.com</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-mint-game to-green-400 rounded-full flex items-center justify-center mr-4">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <p className="text-gray-600">+1 (555) CREATIVE</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-game to-blue-400 rounded-full flex items-center justify-center mr-4">
                      <Clock className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Response Time</h4>
                      <p className="text-gray-600">Usually within 24 hours</p>
                    </div>
                  </div>
                </div>
              </GameCard>
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <GameCard className="bg-gradient-to-br from-peach-game/10 to-yellow-game/10 border-4 border-peach-game/20">
                <h3 className="font-bold text-2xl text-gray-800 mb-6 text-center">
                  <Share className="text-peach-game mr-3 inline" />
                  Social Connections
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.button
                      key={social.platform}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center p-4 bg-gradient-to-br ${social.color} text-white rounded-2xl font-semibold shadow-lg transition-shadow hover:shadow-xl`}
                    >
                      <span className="text-xl mr-2">{social.icon}</span>
                      {social.platform}
                    </motion.button>
                  ))}
                </div>
              </GameCard>
            </motion.div>

            {/* Fun Call to Action */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <GameCard className="bg-gradient-to-br from-lavender-game/10 to-purple-200 border-4 border-lavender-game/20 text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-4"
                >
                  <Gamepad2 className="text-4xl text-lavender-game mx-auto" size={40} />
                </motion.div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Ready to Level Up?</h3>
                <p className="text-gray-600 text-sm">
                  Let's create something that will make the internet a more colorful place!
                </p>
              </GameCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

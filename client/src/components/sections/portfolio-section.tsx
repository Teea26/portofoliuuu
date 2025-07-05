import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GameButton from "@/components/ui/game-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Eye, X, Plus, Trash2 } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";

// Demo projects for display
const demoProjects = [
  {
    id: 1,
    title: "Gaming Montage 2024",
    description: "Epic gaming highlights with cinematic editing and dynamic transitions",
    category: "video",
    thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    mediaUrls: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop"
    ],
    tags: ["Premiere Pro", "After Effects", "Gaming"],
    featured: true,
  },
  {
    id: 2,
    title: "Brand Identity Design",
    description: "Complete brand identity for tech startup with modern aesthetics",
    category: "design",
    thumbnailUrl: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=400&h=300&fit=crop",
    mediaUrls: [
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&h=600&fit=crop"
    ],
    tags: ["Photoshop", "Illustrator", "Branding"],
    featured: false,
  },
  {
    id: 3,
    title: "Viral Social Campaign",
    description: "Social media campaign that reached 10M+ views across platforms",
    category: "social-media",
    thumbnailUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop",
    mediaUrls: [
      "https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop"
    ],
    tags: ["TikTok", "Instagram", "Content Strategy"],
    featured: true,
  },
];

const categories = [
  { id: "all", name: "All Projects", icon: "🎯" },
  { id: "video", name: "Video Production", icon: "🎬" },
  { id: "design", name: "Graphic Design", icon: "🎨" },
  { id: "social-media", name: "Social Media", icon: "📱" },
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [projects, setProjects] = useState(demoProjects);
  const { toast } = useToast();

  // Simple form state for adding projects
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "video",
    thumbnailUrl: "",
    tags: "",
  });

  const filteredProjects = projects.filter((project: any) => 
    activeCategory === "all" || project.category === activeCategory
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project = {
      id: Date.now(),
      ...newProject,
      tags: newProject.tags.split(',').map((tag: string) => tag.trim()),
      mediaUrls: [],
      featured: false,
    };
    setProjects([...projects, project]);
    setShowUploadForm(false);
    setNewProject({ title: "", description: "", category: "video", thumbnailUrl: "", tags: "" });
    toast({ title: "Success!", description: "Project added successfully!" });
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === "mitzu123") {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword("");
      toast({ title: "Success!", description: "Admin access granted!" });
    } else {
      toast({ title: "Error", description: "Wrong password", variant: "destructive" });
    }
  };

  const handleDeleteProject = (projectId: number, projectTitle: string) => {
    console.log("Delete function called for project:", projectId, projectTitle);
    const confirmed = window.confirm(`Sigur vrei să ștergi "${projectTitle}"?`);
    if (confirmed) {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      setProjects(updatedProjects);
      console.log("Project deleted, new projects array:", updatedProjects);
      toast({ title: "Șters!", description: `Proiectul "${projectTitle}" a fost șters.` });
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-lavender-game/20 to-pink-game/20">
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={staggerItem}
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            My Epic Projects 🚀
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            From viral videos to stunning designs, check out my latest creations that have captivated audiences worldwide!
          </motion.p>
          
          {/* Admin Controls */}
          <motion.div variants={staggerItem} className="mt-8">
            {!isAdmin ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdminLogin(true)}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                Admin
              </Button>
            ) : (
              <div className="flex gap-4 justify-center">
                <Dialog open={showUploadForm} onOpenChange={setShowUploadForm}>
                  <DialogTrigger asChild>
                    <GameButton>
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Project
                    </GameButton>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Project</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Project Title</Label>
                        <Input
                          id="title"
                          value={newProject.title}
                          onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                          placeholder="Enter project title"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newProject.description}
                          onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                          placeholder="Describe your project..."
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={(value) => setNewProject({...newProject, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">🎬 Video Production</SelectItem>
                            <SelectItem value="design">🎨 Graphic Design</SelectItem>
                            <SelectItem value="social-media">📱 Social Media</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                        <Input
                          id="thumbnailUrl"
                          value={newProject.thumbnailUrl}
                          onChange={(e) => setNewProject({...newProject, thumbnailUrl: e.target.value})}
                          placeholder="https://example.com/thumbnail.jpg"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                          id="tags"
                          value={newProject.tags}
                          onChange={(e) => setNewProject({...newProject, tags: e.target.value})}
                          placeholder="Premiere Pro, After Effects, Gaming"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Add Project
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAdmin(false)}
                  className="text-gray-500"
                >
                  Logout
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Admin Login Dialog */}
        <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Admin Login</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Category Filter */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={staggerItem}>
              <GameButton
                variant={activeCategory === category.id ? "game" : "default"}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </GameButton>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project: any) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group"
              >
                <div className="h-full overflow-hidden hover:scale-105 transition-all duration-300 rounded-3xl bg-white shadow-xl">
                  <div className="relative">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop`;
                      }}
                    />
                    {project.featured && (
                      <Badge className="absolute top-4 left-4 bg-yellow-game text-black font-bold">
                        ⭐ Featured
                      </Badge>
                    )}
                    {isAdmin && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteProject(project.id, project.title);
                        }}
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-3">
                        <GameButton 
                          size="sm" 
                          className="bg-pink-game hover:bg-pink-game/80"
                          onClick={() => setSelectedProject(project)}
                        >
                          <Eye className="w-4 h-4" />
                        </GameButton>
                        {project.mediaUrls && project.mediaUrls.length > 0 && (
                          <GameButton 
                            size="sm" 
                            className="bg-sky-game hover:bg-sky-game/80"
                            onClick={() => setSelectedProject(project)}
                          >
                            <Play className="w-4 h-4" />
                          </GameButton>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center py-12"
          >
            <p className="text-2xl text-gray-500 mb-4">No projects found in this category yet! 🔍</p>
            {isAdmin && (
              <GameButton onClick={() => setShowUploadForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Project
              </GameButton>
            )}
          </motion.div>
        )}

        {/* Project Gallery Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0" aria-describedby="project-gallery-description">
            <DialogHeader className="sr-only">
              <DialogTitle>{selectedProject?.title || "Project Gallery"}</DialogTitle>
            </DialogHeader>
            {selectedProject && (
              <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-6">
                  <div className="flex justify-between items-start">
                    <div className="text-white">
                      <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                      <p id="project-gallery-description" className="text-gray-300 mb-4">{selectedProject.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags?.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="bg-white/20 text-white">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProject(null)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="w-6 h-6" />
                    </Button>
                  </div>
                </div>

                {/* Media Display */}
                <div className="flex items-center justify-center h-[70vh]">
                  <img
                    src={selectedProject.mediaUrls?.[selectedMedia] || selectedProject.thumbnailUrl}
                    alt={`${selectedProject.title} - Media ${selectedMedia + 1}`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = selectedProject.thumbnailUrl;
                    }}
                  />
                </div>

                {/* Thumbnail Navigation */}
                {selectedProject.mediaUrls && selectedProject.mediaUrls.length > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex gap-2 justify-center overflow-x-auto">
                      <button
                        onClick={() => setSelectedMedia(0)}
                        className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                          selectedMedia === -1 ? "border-white scale-110" : "border-white/50 hover:border-white/80"
                        }`}
                      >
                        <img
                          src={selectedProject.thumbnailUrl}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </button>
                      {selectedProject.mediaUrls.map((media: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setSelectedMedia(index)}
                          className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                            index === selectedMedia ? "border-white scale-110" : "border-white/50 hover:border-white/80"
                          }`}
                        >
                          <img
                            src={media}
                            alt={`Media ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
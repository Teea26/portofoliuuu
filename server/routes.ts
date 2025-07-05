import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { insertContactMessageSchema, insertProjectSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup multer for file uploads
  const uploadDir = path.join(process.cwd(), 'uploads');
  
  // Ensure upload directory exists
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }

  const storage_multer = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({ 
    storage: storage_multer,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|webm/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only image and video files are allowed!'));
      }
    }
  });

  // Serve uploaded files
  app.use('/uploads', express.static(uploadDir));

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      res.json({ 
        success: true, 
        message: "Thank you for your message! I'll get back to you soon! 🎮✨",
        id: message.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Please check your form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Something went wrong. Please try again." 
        });
      }
    }
  });

  // Get all contact messages (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch messages" 
      });
    }
  });

  // Project management routes
  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const { category } = req.query;
      const projects = category 
        ? await storage.getProjectsByCategory(category as string)
        : await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch projects" 
      });
    }
  });

  // Get single project
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProjectById(parseInt(req.params.id));
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          message: "Project not found" 
        });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch project" 
      });
    }
  });

  // Create new project with file upload
  app.post("/api/projects", upload.array('media', 10), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      const mediaUrls = files ? files.map(file => `/uploads/${file.filename}`) : [];
      
      const projectData = {
        ...req.body,
        mediaUrls,
        tags: req.body.tags ? JSON.parse(req.body.tags) : [],
        featured: req.body.featured === 'true'
      };

      const validatedData = insertProjectSchema.parse(projectData);
      const project = await storage.createProject(validatedData);
      
      res.json({ 
        success: true, 
        message: "Project created successfully!",
        project 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Please check your project data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Something went wrong while creating project." 
        });
      }
    }
  });

  // Update project
  app.put("/api/projects/:id", upload.array('media', 10), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      const newMediaUrls = files ? files.map(file => `/uploads/${file.filename}`) : [];
      
      const existingProject = await storage.getProjectById(parseInt(req.params.id));
      if (!existingProject) {
        return res.status(404).json({ 
          success: false, 
          message: "Project not found" 
        });
      }

      const mediaUrls = req.body.keepExistingMedia === 'true' 
        ? [...existingProject.mediaUrls, ...newMediaUrls]
        : newMediaUrls.length > 0 ? newMediaUrls : existingProject.mediaUrls;

      const updateData = {
        ...req.body,
        mediaUrls,
        tags: req.body.tags ? JSON.parse(req.body.tags) : existingProject.tags,
        featured: req.body.featured ? req.body.featured === 'true' : existingProject.featured
      };

      // Remove undefined values
      Object.keys(updateData).forEach(key => 
        updateData[key] === undefined && delete updateData[key]
      );

      const project = await storage.updateProject(parseInt(req.params.id), updateData);
      
      res.json({ 
        success: true, 
        message: "Project updated successfully!",
        project 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to update project" 
      });
    }
  });

  // Delete project
  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProjectById(parseInt(req.params.id));
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          message: "Project not found" 
        });
      }

      // Delete associated files
      for (const mediaUrl of project.mediaUrls) {
        try {
          const filePath = path.join(process.cwd(), mediaUrl);
          await fs.unlink(filePath);
        } catch (error) {
          console.warn(`Failed to delete file: ${mediaUrl}`);
        }
      }

      await storage.deleteProject(parseInt(req.params.id));
      
      res.json({ 
        success: true, 
        message: "Project deleted successfully!" 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete project" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

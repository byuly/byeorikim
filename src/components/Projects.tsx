import { Card } from "@/components/ui/card";
import { Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  videoUrl?: string;
  tags: string[];
  githubUrl?: string;
}

const Projects = () => {
  // Template projects - user can replace with their own
  const projects: Project[] = [
    {
      title: "Gomoku-Matched",
      description: "Gomoku Matched is a competitive, real-time strategy board game where two players face off to place five stones in a row on a grid. The game supports both human-vs-human matches and human-vs-AI matches, featuring machine learning-powered AI opponents with varying skill levels.",
      tags: ["Java", "SpringBoot", "Python", "Redis", "Apache Kafka", "Websocket", "PostgreSQL", "Vite"],
      githubUrl: "https://github.com/byuly/GomokuMatching"
    },
    {
      title: "URLer",
      description: "Urler is a full-stack web application for shortening long URLs and tracking their usage with real-time analytics. It provides a clean, intuitive interface for creating short links and monitoring their performance.",
      tags: ["Java", "SpringBoot", "Spring Security","Websocket", "PostgreSQL", "NextJS"],
      githubUrl: "https://github.com/byuly/Urler"
    },
    {
      title: "DearMe @ nwHacks",
      description: "Dear Me is a private, offline conversational AI that acts as your personal companion throughout the day. By running on a local LLM, speech models, and database, it ensures all your data belongs to yourself, for yourself!",
      tags: ["Python", "FastAPI", "Ollama", "NextJS", "Redis", "XTTS-V2"],
      githubUrl:"https://github.com/byuly/DearMe"
    },
    {
      title: "CharityBite.co",
      description: "Project models the operation of food charities to enable food donation and redistribution management. Designed and optimized complex SQL queries to manage 3NF-normalized Oracle database of 10+ interrelated tables. The overall aim of building this project was getting familiar with various relational database concepts, such as ER diagrams, normalization, SQL security, and SQL queries!",
      tags: ["HTML", "CSS", "JavaScript", "NodeJS", "Oracle Database"],
      githubUrl: "https://github.com/byuly/CharityBite.co"
    },
    {
      title: "Sleep Detector",
      description: "A real-time sleep detection system that monitors user posture and eye status using computer vision and machine learning. The system uses a trained CNN model with 28,709 images for emotion detection, combined with OpenCV and Mediapipe for live video processing and body posture analysis to provide instant feedback when drowsiness is detected.",
      tags: ["Python", "TensorFlow", "Keras", "OpenCV", "Mediapipe", "Threading"],
      githubUrl:"https://github.com/byuly/Sleep-Detector"
    },
    {
      title: "Seul, the Therapy Bot",
      description: "An AI-powered therapy companion that provides mental health support through conversational AI. Built with Streamlit for an interactive web interface, leveraging RAG (Retrieval-Augmented Generation) architecture with ChromaDB for context-aware responses, and AWS Bedrock for serving advanced AI models to deliver personalized therapeutic conversations.",
      tags: ["Python", "Streamlit", "RAG", "ChromaDB"],
      githubUrl:"https://github.com/byuly/Seul-the-TherapyBot"
    },
    {
      title: "DALL-E Clone Website",
      description: "A full-stack web application built with the MERN stack that enables text-to-image generation using OpenAI's DALL-E 2 API. Features a REST API for handling text prompt submissions, image generation, and database storage integration with Cloudinary for efficient management of user prompts and generated images.",
      tags: ["JavaScript", "React", "Express", "MongoDB", "NodeJS"],
      githubUrl:"https://github.com/byuly/dall-e_clone"
    },
    {
      title: "Sneaker Collection",
      description: "Keep track of your favorite sneakers and don't get lost in your collection! A desktop application built with Java and Java Swing that helps sneaker enthusiasts organize and manage their collections. Developed with a focus on learning design patterns such as Singleton and implementing comprehensive unit testing.",
      tags: ["Java", "Java Swing", "Unit Testing"],
      githubUrl: "https://github.com/byuly/Sneaker-Collection-"
    }
  ];

  return (
    <section id="projects" className="min-h-screen -mt-12 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block pixel-border bg-secondary px-4 py-2 mb-4 retro-shadow">
            <h2 className="text-secondary-foreground text-sm md:text-base">LEVEL SELECT</h2>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground mt-4">
            check out my quests! (my projects)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="pixel-border retro-shadow bg-card p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm md:text-base text-foreground">
                    {project.title}
                  </h3>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel-border bg-accent px-2 py-1 hover:translate-x-1 hover:translate-y-1 transition-transform"
                    >
                      <Github className="w-4 h-4 text-accent-foreground" />
                    </a>
                  )}
                </div>

                {project.videoUrl && (
                  <div className="aspect-video pixel-border bg-muted overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={project.videoUrl}
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                <p className="text-xs leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="pixel-border bg-muted px-2 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

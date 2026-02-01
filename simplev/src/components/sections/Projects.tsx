import AnimatedSection from "../AnimatedSection";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "gomoku-matched",
    description: "competitive, real-time strategy board game with human-vs-human and human-vs-ai matches featuring ml-powered opponents.",
    link: "https://github.com/byuly/GomokuMatching",
  },
  {
    name: "urler",
    description: "full-stack url shortener with real-time analytics for tracking link performance.",
    link: "https://github.com/byuly/Urler",
  },
  {
    name: "dearme @ nwhacks",
    description: "private, offline conversational ai companion running on local llm, speech models, and database.",
    link: "https://github.com/byuly/DearMe",
  },
  {
    name: "charitybite.co",
    description: "food charity management platform with optimized sql queries on a 3nf-normalized oracle database.",
    link: "https://github.com/byuly/CharityBite.co",
  },
  {
    name: "sleep detector",
    description: "real-time sleep detection using computer vision and a cnn model trained on 28,709 images.",
    link: "https://github.com/byuly/Sleep-Detector",
  },
  {
    name: "seul, the therapy bot",
    description: "ai therapy companion using rag architecture with chromadb and aws bedrock.",
    link: "https://github.com/byuly/Seul-the-TherapyBot",
  },
  {
    name: "dall-e clone website",
    description: "mern stack text-to-image generation app using openai's dall-e 2 api with cloudinary storage.",
    link: "https://github.com/byuly/dall-e_clone",
  },
  {
    name: "sneaker collection",
    description: "desktop java app for organizing sneaker collections, built with swing and design patterns.",
    link: "https://github.com/byuly/Sneaker-Collection-",
  },
];

const Projects = () => {
  return (
    <AnimatedSection className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">
        projects
      </h2>
      <div className="space-y-8 max-w-2xl">
        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="group block py-4 -mx-4 px-4 rounded-lg transition-colors hover:bg-muted/50"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-light text-foreground lowercase flex items-center gap-2">
                  {project.name}
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:-rotate-12" />
                </h3>
                <p className="mt-1 text-muted-foreground font-light lowercase">
                  {project.description}
                </p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default Projects;

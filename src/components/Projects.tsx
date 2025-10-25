import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

interface Project {
  title: string;
  description: string;
  videoUrl: string;
  tags: string[];
}

const Projects = () => {
  // Template projects - user can replace with their own
  const projects: Project[] = [
    {
      title: "PROJECT ALPHA",
      description: "A retro-styled game engine built with modern web technologies. Features include sprite animation, collision detection, and level editor.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      tags: ["React", "Canvas API", "TypeScript"]
    },
    {
      title: "PIXEL QUEST",
      description: "Interactive storytelling platform with branching narratives. Built with real-time multiplayer capabilities and persistent world state.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      tags: ["WebSocket", "Node.js", "PostgreSQL"]
    },
    {
      title: "RETRO DASH",
      description: "Analytics dashboard with a nostalgic twist. Transforms boring data into engaging 8-bit visualizations with gamification elements.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      tags: ["D3.js", "React", "API Integration"]
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block pixel-border bg-secondary px-4 py-2 mb-4 retro-shadow">
            <h2 className="text-secondary-foreground text-sm md:text-base">LEVEL SELECT</h2>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground mt-4">
            Check out these completed quests
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
                  <div className="pixel-border bg-accent px-2 py-1">
                    <Play className="w-4 h-4 text-accent-foreground" />
                  </div>
                </div>

                <div className="aspect-video pixel-border bg-muted overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={project.videoUrl}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

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

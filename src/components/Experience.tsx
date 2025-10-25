import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  level: number;
}

const Experience = () => {
  // Template experience - user can replace with their own
  const experiences: ExperienceItem[] = [
    {
      role: "SENIOR DEV",
      company: "Tech Corp",
      period: "2022 - PRESENT",
      description: "Led development of scalable web applications. Implemented CI/CD pipelines and mentored junior developers. Increased team productivity by 40%.",
      level: 5
    },
    {
      role: "FULL STACK DEV",
      company: "Startup Inc",
      period: "2020 - 2022",
      description: "Built responsive web applications from scratch. Collaborated with designers and product managers. Shipped 15+ features that improved user engagement.",
      level: 4
    },
    {
      role: "JUNIOR DEV",
      company: "Code Academy",
      period: "2019 - 2020",
      description: "Developed and maintained client websites. Fixed bugs and implemented new features. Gained experience in React, Node.js, and database design.",
      level: 3
    }
  ];

  return (
    <section id="experience" className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block pixel-border bg-primary px-4 py-2 mb-4 retro-shadow">
            <h2 className="text-primary-foreground text-sm md:text-base">ACHIEVEMENT LOG</h2>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground mt-4">
            Experience points earned through battles
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card 
              key={index}
              className="pixel-border retro-shadow bg-card p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-sm md:text-base text-foreground mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {exp.company}
                    </p>
                  </div>
                  <div className="pixel-border bg-accent px-3 py-1 self-start sm:self-auto">
                    <p className="text-xs text-accent-foreground">{exp.period}</p>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">LEVEL:</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < exp.level 
                            ? "fill-accent text-accent" 
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

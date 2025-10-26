import { Card } from "@/components/ui/card";
import { Star, ChevronDown } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  level: number;
  skills?: string[];
}

const Experience = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Template experience - user can replace with their own
  const experiences: ExperienceItem[] = [
    {
      company: "SOFTWARE ENGINEER INTERN",
      role: "Royal Bank of Canada (RBC)",
      period: "sep. - dec. 2025",
      description: "currently an intern on the real-time payments team!",
      level: 1,
      skills: ["Java", "Spring Boot", "IBM MQ", "Apache Kafka", "Testing"]
    },
    {
      company: "SOFTWARE ENGINEER INTERN",
      role: "SAP",
      period: "jan. - aug. 2025",
      description: "worked on the data acquisition team!",
      level: 1,
      skills: ["Java", "Python", "Spring Framework", "Jenkins", "JavaScript", "Testing"]
    }
  ];

  return (
    <section id="experience" className="min-h-screen pt-12 pb-0 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block pixel-border bg-primary px-4 py-2 mb-4 retro-shadow">
            <h2 className="text-primary-foreground text-sm md:text-base">EXPERIENCE LOG</h2>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground mt-4">
            experience points earned.
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

                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="pixel-border bg-muted px-2 py-1 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

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

        {/* Scroll Down Arrow to Projects */}
        <div className="flex justify-center">
          <button
            onClick={() => scrollToSection("projects")}
            className="animate-bounce"
            aria-label="Scroll to projects"
          >
            <ChevronDown className="w-8 h-8 text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Experience;

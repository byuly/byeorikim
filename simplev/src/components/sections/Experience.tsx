import AnimatedSection from "../AnimatedSection";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "activision blizzard",
    company: "software engineer intern with focus in data engineering",
    period: "jan. 2026",
    description: "an intern on the data platforms team.",
  },
  {
    role: "royal bank of canada (rbc)",
    company: "software engineer intern",
    period: "sep. — dec. 2025",
    description: "worked on the real-time payments team. building receive functionality in the cloud.",
  },
  {
    role: "sap",
    company: "software engineer intern",
    period: "jan. — aug. 2025",
    description: "worked on the data acquisition team. maintaining and building features for acquiring data from different data sources.",
  },
];

const Experience = () => {
  return (
    <AnimatedSection className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">
        experience
      </h2>
      <div className="space-y-12 max-w-2xl">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ x: 4 }}
            className="group relative pl-4 cursor-default"
          >
            <div className="absolute left-0 top-0 w-0.5 h-0 bg-foreground/40 transition-all duration-300 ease-out group-hover:h-full" />
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
              <h3 className="text-lg md:text-xl font-light text-foreground lowercase">
                {exp.role}
              </h3>
              <span className="text-sm text-muted-foreground font-light lowercase">
                {exp.period}
              </span>
            </div>
            <p className="text-muted-foreground font-light lowercase mb-1">
              {exp.company}
            </p>
            <p className="text-sm text-muted-foreground/80 font-light lowercase leading-relaxed">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default Experience;

import AnimatedSection from "../AnimatedSection";
import { motion } from "framer-motion";

const technologies = [
  "java",
  "kotlin",
  "go",
  "python",
  "spring boot",
  "sql",
  "redis",
  "apache kafka",
  "apache flink",
  "apache spark",
  "kubernetes",
  "docker",
  "aws/gcp",
];

const Tech = () => {
  return (
    <AnimatedSection className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">
        tech i know
      </h2>
      <div className="flex flex-wrap gap-3 md:gap-4 max-w-3xl">
        {technologies.map((tech, index) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -2, scale: 1.05 }}
            className="px-4 py-2 text-sm md:text-base font-light text-foreground border border-border rounded-full lowercase cursor-default transition-colors hover:border-foreground/30 hover:bg-foreground/5"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default Tech;

import AnimatedSection from "../AnimatedSection";
import { motion } from "framer-motion";

const About = () => {
  return (
    <AnimatedSection className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-16">
        about me
      </h2>
      
      <div className="max-w-3xl space-y-16">
        {/* Main intro - conversational */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-light text-foreground leading-relaxed lowercase"
        >
          i like backend. i like systems. i like big data. 
        </motion.p>

        {/* Quick facts in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -3, x: 2 }}
            className="pl-4 border-l-2 border-transparent hover:border-foreground/20 transition-colors duration-200 cursor-default"
          >
            <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">currently</span>
            <p className="mt-2 text-foreground font-light lowercase">
              cs student at ubc, interning at activision
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -3, x: 2 }}
            className="pl-4 border-l-2 border-transparent hover:border-foreground/20 transition-colors duration-200 cursor-default"
          >
            <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">previously</span>
            <p className="mt-2 text-foreground font-light lowercase">
              interned at rbc and sap
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -3, x: 2 }}
            className="pl-4 border-l-2 border-transparent hover:border-foreground/20 transition-colors duration-200 cursor-default"
          >
            <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">approach</span>
            <p className="mt-2 text-foreground font-light lowercase">
              software engineering through scalable backend design and big-data systems
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -3, x: 2 }}
            className="pl-4 border-l-2 border-transparent hover:border-foreground/20 transition-colors duration-200 cursor-default"
          >
            <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">outside work</span>
            <p className="mt-2 text-foreground font-light lowercase">
              music & running
            </p>
          </motion.div>
        </div>

        {/* Closing thought */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground font-light lowercase text-lg border-l-2 border-border pl-6"
        >
          10x developer with ai and coffee. but can still code without.
        </motion.p>
      </div>
    </AnimatedSection>
  );
};

export default About;

import { motion } from "framer-motion";

const name = "Byeori Kim";

const containerVariants = {
  rest: {
    transition: { staggerChildren: 0.06 },
  },
  hover: {
    transition: { staggerChildren: 0.06 },
  },
};

const letterVariants = {
  rest: { rotate: 0, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  hover: { rotate: 8, y: 2, transition: { duration: 0.4, ease: "easeInOut" as const } },
};

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, scale: [1, 1.015, 1] }}
        transition={{
          opacity: { duration: 0.8, ease: "easeOut" },
          y: { duration: 0.8, ease: "easeOut" },
          scale: { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
        }}
        className="flex flex-col items-start origin-left"
      >
        <motion.div
          className="cursor-default"
          initial="rest"
          animate="rest"
          whileHover="hover"
          variants={containerVariants}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground">
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                style={{ display: "inline-block", transformOrigin: "bottom left", marginLeft: i === 0 ? "-0.10em" : undefined, minWidth: char === " " ? "0.3em" : undefined }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-4 text-lg md:text-xl text-muted-foreground font-light lowercase"
        >
          software engineer · ubc cs
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;

import AnimatedSection from "../AnimatedSection";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    name: "email",
    href: "mailto:kimlbyeori@gmail.com",
    icon: Mail,
  },
  {
    name: "github",
    href: "https://github.com/byuly",
    icon: Github,
  },
  {
    name: "linkedin",
    href: "https://linkedin.com/in/byeorik",
    icon: Linkedin,
  },
];

const Contact = () => {
  return (
    <AnimatedSection className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-8">
        get in touch
      </h2>
      <div className="max-w-2xl">
        <p className="text-xl md:text-2xl font-light text-foreground leading-relaxed lowercase mb-12">
          reach out please
        </p>
        <div className="flex gap-6">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors lowercase"
            >
              <motion.span
                whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 0.4 }}
              >
                <link.icon className="w-5 h-5" />
              </motion.span>
              <span className="text-sm font-light">{link.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
      
      <div className="mt-24 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground/60 font-light lowercase">
          © {new Date().getFullYear()} byeori kim. hire me thanks.
        </p>
      </div>
    </AnimatedSection>
  );
};

export default Contact;

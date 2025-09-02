import { motion } from "framer-motion";

export function AnimatedPanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-retroGray shadow-insetRetro p-retro-pad rounded-retro"
    >
      {children}
    </motion.div>
  );
}

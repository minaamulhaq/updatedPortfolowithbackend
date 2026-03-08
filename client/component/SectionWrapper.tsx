import { motion } from "framer-motion";
export const SectionWrapper = ({
    children,
    id,
    className = "",
}: {
    children: React.ReactNode;
    id?: string;
    className?: string;
}) => (
    <motion.section
        id={id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`py-16 md:py-10 px-5 md:px-12 max-w-7xl mx-auto ${className}`}
    >
        {children}
    </motion.section>
);

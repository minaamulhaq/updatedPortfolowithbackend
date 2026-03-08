
export const GlassCard = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={`bg-[#16161d] border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 ${className}`}
    >
        {children}
    </div>
);
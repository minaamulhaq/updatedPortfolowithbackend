import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "rectangle" | "circle" | "text";
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  variant = "rectangle",
  width,
  height,
}) => {
  const baseClasses = "animate-pulse bg-white/5";
  const variantClasses = {
    rectangle: "rounded-md",
    circle: "rounded-full",
    text: "rounded h-4 w-full mb-2",
  };

  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

export default Skeleton;

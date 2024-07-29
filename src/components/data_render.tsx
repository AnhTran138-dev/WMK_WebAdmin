import React from "react";
import { Loading } from "./loading";
import { cn } from "../lib";

interface DataRenderProps {
  children: React.ReactNode;
  error: string | null;
  isLoading: boolean;
  className?: string;
}

const DataRender = ({
  children,
  error,
  isLoading,
  className,
}: DataRenderProps) => {
  if (isLoading) {
    return (
      <div
        className={
          (cn("flex justify-center items-center w-full h-full"), className)
        }
      >
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "flex justify-center items-center w-full h-fit",
          className
        )}
      >
        {error}
      </div>
    );
  }

  return <div className={cn(className)}>{children}</div>;
};

export default DataRender;

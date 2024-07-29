import React from "react";
import { Loading } from "./loading";

interface DataRenderProps {
  children: React.ReactNode;
  error: string | null;
  isLoading: boolean;
}

const DataRender = ({ children, error, isLoading }: DataRenderProps) => {
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="flex justify-center w-full h-screen">{error}</div>;
  }

  return children;
};

export default DataRender;

import { Loader } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center size-full">
      <Loader className="mr-2 size-28 animate-spin" />
    </div>
  );
};

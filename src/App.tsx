import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import routes from "./router";
import useThemeStore from "./states/local/theme";
import { useEffect } from "react";
import { Toaster } from "./components/ui";
import { TooltipProvider } from "./components/ui/tooltip";

const queryClient = new QueryClient();

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={routes} />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

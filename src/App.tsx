import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui";
import { TooltipProvider } from "./components/ui/tooltip";
import routes from "./router";
import useThemeStore from "./states/local/theme";
import { APIProvider } from "@vis.gl/react-google-maps";
import { env } from "./lib";

const queryClient = new QueryClient();

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <APIProvider apiKey={env.VITE_API_KEY_GOOGLE_MAPS}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <RouterProvider router={routes} />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </APIProvider>
  );
}

export default App;

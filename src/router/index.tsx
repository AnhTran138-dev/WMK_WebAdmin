import ErrorPage from "@/components/error_page";
import DashboardLayout from "@/components/layout";
import { Loading } from "@/components/loading";
import ProtectRoute from "@/components/protect_route";
import LoginPage from "@/views/loginpage/login_page";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

/*eslint-disable*/
const HomePage = lazy(() => import("@/views/homepage/home_page"));
/*eslint-enable*/
const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute>
        <DashboardLayout />
      </ProtectRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/sign-in",
    element: <LoginPage />,
  },
]);

export default routes;

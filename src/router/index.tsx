import ErrorPage from "@/components/error_page";
import DashboardLayout from "@/components/layout";
import { Loading } from "@/components/loading";
import ProtectRoute from "@/components/protect_route";
import LoginPage from "@/views/loginpage/login_page";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

/*eslint-disable*/
const HomePage = lazy(() => import("@/views/homepage/home_page"));
const UserPage = lazy(() => import("@/views/userpage/user_page"));
const ReceiptPage = lazy(
  () => import("@/views/receiptpage/receiptlist/receipt_page")
);
const ReceipCategoryPage = lazy(
  () => import("@/views/receiptpage/categorypage/categories_page")
);
const IngredientPage = lazy(
  () => import("@/views/ingredientpage/ingredientlist/ingredient_page")
);
const IngredientCategoryPage = lazy(
  () => import("@/views/ingredientpage/categorypage/categories_page")
);
const OrderPage = lazy(() => import("@/views/orderpage/order_page"));
const WeeklyPlanPage = lazy(
  () => import("@/views/weeklyplanpage/weekly_plan_page")
);
const NotificationPage = lazy(
  () => import("@/views/notificationpage/notification_page")
);
const SettingPage = lazy(() => import("@/views/settingpage/setting_page"));
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
      {
        path: "user",
        element: (
          <Suspense fallback={<Loading />}>
            <UserPage />
          </Suspense>
        ),
      },
      {
        path: "recipe",
        element: (
          <Suspense fallback={<Loading />}>
            <ReceiptPage />
          </Suspense>
        ),
      },
      {
        path: "recipe-categories",
        element: (
          <Suspense fallback={<Loading />}>
            <ReceipCategoryPage />
          </Suspense>
        ),
      },
      {
        path: "ingredient",
        element: (
          <Suspense fallback={<Loading />}>
            <IngredientPage />
          </Suspense>
        ),
      },
      {
        path: "ingredient-categories",
        element: (
          <Suspense fallback={<Loading />}>
            <IngredientCategoryPage />
          </Suspense>
        ),
      },
      {
        path: "weekly-plan",
        element: (
          <Suspense fallback={<Loading />}>
            <WeeklyPlanPage />
          </Suspense>
        ),
      },
      {
        path: "order",
        element: (
          <Suspense fallback={<Loading />}>
            <OrderPage />
          </Suspense>
        ),
      },
      {
        path: "notification",
        element: (
          <Suspense fallback={<Loading />}>
            <NotificationPage />
          </Suspense>
        ),
      },
      {
        path: "setting",
        element: (
          <Suspense fallback={<Loading />}>
            <SettingPage />
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

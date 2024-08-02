import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui";
import { TabsContent } from "@radix-ui/react-tabs";
import RecipeRequest from "./tabs/recipe_request";
import WeeklyPlanRequest from "./tabs/weekly_plan_request";

const NotificationPage = () => {
  const [isTabActive, setIsTabActive] = useState<string>("recipe");

  return (
    <div className="px-10 py-5">
      <div className="text-lg font-semibold text-gray-500 uppercase ">
        Notification Request
      </div>
      <Tabs value={isTabActive} onValueChange={setIsTabActive}>
        <TabsList>
          <TabsTrigger value="recipe">Recipe</TabsTrigger>
          <TabsTrigger value="weeklyplan">Weekly Plan</TabsTrigger>
        </TabsList>
        <TabsContent value="recipe">
          <RecipeRequest />
        </TabsContent>
        <TabsContent value="weeklyplan">
          <WeeklyPlanRequest />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationPage;

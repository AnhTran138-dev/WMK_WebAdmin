import { useEffect, useState } from "react";
import { Input, Tabs, TabsList, TabsTrigger } from "../../components/ui";
import { TabsContent } from "@radix-ui/react-tabs";
import RecipeRequest from "./tabs/recipe_request";
import WeeklyPlanRequest from "./tabs/weekly_plan_request";
import { TokenResponse } from "../../models/responses";
import { jwtDecode } from "jwt-decode";
import { getItem } from "../../lib";

const NotificationPage = () => {
  const [isTabActive, setIsTabActive] = useState<string>("recipe");
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const token: TokenResponse = jwtDecode(getItem("token"));
    setRole(
      token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    );
  }, []);

  return (
    <div className="px-10 py-5">
      <div className="text-lg font-semibold text-gray-500 uppercase ">
        Notification Request
      </div>
      <Tabs value={isTabActive} onValueChange={setIsTabActive}>
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="recipe">Recipe</TabsTrigger>
            <TabsTrigger value="weeklyplan">Weekly Plan</TabsTrigger>
          </TabsList>
          <Input
            type="text"
            placeholder="Search"
            className="w-1/4 p-1 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <TabsContent value="recipe">
          <RecipeRequest role={role} name={name} />
        </TabsContent>
        <TabsContent value="weeklyplan">
          <WeeklyPlanRequest title={name} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationPage;

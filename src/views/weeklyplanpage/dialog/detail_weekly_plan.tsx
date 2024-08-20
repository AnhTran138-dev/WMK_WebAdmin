import DataRender from "@/components/data_render";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  ScrollArea,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { Response } from "@/models/responses";
import { WeeklyPlanList } from "@/models/responses/weekly_plan";
import { TabsContent } from "@radix-ui/react-tabs";
import React, { useState } from "react";
import GeneralInfoWeeklyPlan from "../tabs/GeneralInfoWeeklyPlan";
import RecipeListInfo from "../tabs/RecipeListInfo";

interface DetailWeeklyPlanProps {
  id: string;
}

const DetailWeeklyPlan: React.FC<DetailWeeklyPlanProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState<string>("general");
  const {
    data: weeklyPlan,
    loading,
    error,
  } = useFetch<Response<WeeklyPlanList>>(`/api/weeklyplan/get-id/${id}`);

  return (
    <div className="p-4">
      <DataRender isLoading={loading} error={error}>
        {weeklyPlan && weeklyPlan.data && (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <AlertDialogHeader>
              <div className="flex flex-row items-center justify-between">
                <AlertDialogTitle>{weeklyPlan.data.title}</AlertDialogTitle>
                <TabsList>
                  <TabsTrigger value="general">General Info</TabsTrigger>
                  <TabsTrigger value="recipe">Recipe Info</TabsTrigger>
                </TabsList>
              </div>
            </AlertDialogHeader>
            <AlertDialogDescription className="mt-2">
              <ScrollArea className="h-96">
                <TabsContent value="general">
                  <GeneralInfoWeeklyPlan weeklyPlan={weeklyPlan.data} />
                </TabsContent>
                <TabsContent value="recipe">
                  <RecipeListInfo recipePlans={weeklyPlan.data.recipePLans} />
                </TabsContent>
              </ScrollArea>
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </Tabs>
        )}
      </DataRender>
    </div>
  );
};

export default DetailWeeklyPlan;

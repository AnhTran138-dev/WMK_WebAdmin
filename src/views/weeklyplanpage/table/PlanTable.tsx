import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { DayInWeek, MealInDay } from "@/models/requests";
import { WeeklyPlanList } from "@/models/responses/weekly_plan";
import React from "react";

interface PlanTableProps {
  weeklyPlan: WeeklyPlanList;
}

const MealInDayList = [
  { id: 1, name: "Breakfast", value: MealInDay.Breakfast },
  { id: 2, name: "Lunch", value: MealInDay.Lunch },
  { id: 3, name: "Dinner", value: MealInDay.Dinner },
];

const DayInWeekList = [
  { id: 1, name: "Monday", DayInWeek: DayInWeek.Monday },
  { id: 2, name: "Tuesday", DayInWeek: DayInWeek.Tuesday },
  { id: 3, name: "Wednesday", DayInWeek: DayInWeek.Wednesday },
  { id: 4, name: "Thursday", DayInWeek: DayInWeek.Thursday },
  { id: 5, name: "Friday", DayInWeek: DayInWeek.Friday },
  { id: 6, name: "Saturday", DayInWeek: DayInWeek.Saturday },
  { id: 7, name: "Sunday", DayInWeek: DayInWeek.Sunday },
];

const PlanTable: React.FC<PlanTableProps> = ({ weeklyPlan }) => {
  // const formatDate = (dateString: Date | null) => {
  //   return dateString
  //     ? formatFromISOString(dateString, FormatType.DATETIME)
  //     : "N/A";
  // };

  return (
    <div>
      <h1>Calendar</h1>
      {/* Table */}
      <Table className="w-full border border-gray-300 shadow-md rounded-xl">
        <TableCaption className="mb-4 text-lg font-semibold">
          Weekly Menu Plan
        </TableCaption>
        <TableHeader className="text-gray-700 bg-blue-100">
          <TableRow>
            <TableHead className="p-4 font-semibold">Meal / Day</TableHead>
            {DayInWeekList.map((day) => (
              <TableHead key={day.id} className="p-4 font-semibold">
                {day.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {MealInDayList.map((meal) => (
            <TableRow key={meal.id} className="border-t border-gray-200">
              <TableCell className="p-4 font-medium bg-gray-100">
                {meal.name}
              </TableCell>
              {DayInWeekList.map((day) => (
                <TableCell key={day.id} className="p-4">
                  {weeklyPlan.recipePLans
                    .filter(
                      (item) =>
                        item.dayInWeek === day.DayInWeek &&
                        item.mealInDay === meal.value
                    )
                    .map((item) => (
                      <Badge
                        key={item.recipe.id}
                        variant="outline"
                        className="flex items-center justify-between max-w-3xl p-2 mb-2 text-center border border-gray-300 rounded-md shadow-sm bg-slate-200 w-fit"
                      >
                        <Tooltip>
                          <TooltipTrigger className="flex items-center space-x-2 text-sm w-fit">
                            {item.recipe.name} (x{item.quantity})
                          </TooltipTrigger>
                          <TooltipContent>
                            <span>{item.recipe.name}</span>
                          </TooltipContent>
                        </Tooltip>
                      </Badge>
                    ))}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlanTable;

import DataRender from "@/components/data_render";
import { Button, ScrollArea } from "@/components/ui";
import { useDebounce } from "@/hooks";
import useFetch from "@/hooks/useFetch";
import { formatFromISOString, FormatType } from "@/lib";
import { Response } from "@/models/responses";
import { WeeklyPlanList } from "@/models/responses/weekly_plan";
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import React, { useMemo, useState } from "react";
import { SelectType } from "../notification_page";
import Show from "../../../lib/show";

interface WeeklyPlanRequestProps {
  role: string;
  title: string;
  handleChangeStatus: (
    chooseNotification: SelectType,
    refetch: () => void
  ) => void;
}

const WeeklyPlanRequest: React.FC<WeeklyPlanRequestProps> = ({
  title,
  handleChangeStatus,
  role,
}) => {
  const titleDebounce = useDebounce(title, 500);

  const options = useMemo(() => {
    const params: { [key: string]: string } = {};
    if (titleDebounce) {
      params.Title = titleDebounce;
    }
    return { params };
  }, [titleDebounce]);

  const {
    data: weeklyplans,
    loading,
    error,
    refetch,
  } = useFetch<Response<WeeklyPlanList[]>>(
    "/api/weeklyplan/get-all-filter",
    options
  );

  const processingPlans = weeklyplans?.data.filter(
    (plan) => plan.processStatus.toLowerCase() === "processing"
  );

  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedPlanId(expandedPlanId === id ? null : id);
  };

  return (
    <DataRender className="p-4" isLoading={loading} error={error}>
      {processingPlans && processingPlans.length > 0 ? (
        <div className="flex flex-col space-y-4">
          {processingPlans.map((plan) => (
            <Show key={plan.id}>
              <Show.When
                isTrue={
                  plan.processStatus.toLowerCase() === "processing" &&
                  (role === "Admin" || role === "Manager")
                }
              >
                <div className="relative overflow-hidden transition-shadow duration-300 rounded-lg shadow cursor-pointer bg-primary hover:shadow-xl">
                  <div
                    className="flex flex-col h-full"
                    onClick={() => toggleExpand(plan.id)}
                  >
                    <div className="flex items-start flex-1 p-4 bg-card">
                      <img
                        src={plan.urlImage}
                        alt={plan.title}
                        className="object-cover w-32 h-24 rounded-md"
                      />
                      <div className="flex-1 ml-4">
                        <h3 className="text-xl font-bold text-primary">
                          {plan.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatFromISOString(plan.beginDate, FormatType.DATE)}{" "}
                          - {formatFromISOString(plan.endDate, FormatType.DATE)}
                        </p>
                        <p className="mt-2 text-base text-muted-foreground">
                          {plan.description}
                        </p>
                      </div>
                      <div className="p-2 text-primary hover:text-primary-darker">
                        {expandedPlanId === plan.id ? (
                          <ChevronUp className="w-6 h-6" />
                        ) : (
                          <ChevronDown className="w-6 h-6" />
                        )}
                      </div>
                    </div>
                    {expandedPlanId === plan.id && (
                      <div className="p-4 bg-slate-100">
                        <ScrollArea className="space-y-4 h-96">
                          {plan.recipePLans.map((recipePlan) => (
                            <div
                              key={recipePlan.id}
                              className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                            >
                              <img
                                src={recipePlan.recipe.img}
                                alt={recipePlan.recipe.name}
                                className="object-cover w-20 h-20 rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-md text-primary">
                                  {recipePlan.recipe.name}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Quantity: {recipePlan.quantity}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Price: ${recipePlan.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </ScrollArea>
                      </div>
                    )}
                  </div>
                  <div className="absolute p-2 space-x-3 bottom-4 right-4">
                    <Button
                      variant="success"
                      onClick={async (e) => {
                        e.stopPropagation();
                        handleChangeStatus(
                          {
                            id: plan.id,
                            status: 1,
                            type: "weeklyplan",
                            author: "access",
                          },
                          refetch
                        );
                      }}
                    >
                      Access
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChangeStatus(
                          {
                            id: plan.id,
                            status: 2,
                            type: "weeklyplan",
                            author: "deny",
                          },
                          refetch
                        );
                      }}
                    >
                      Deny
                    </Button>
                  </div>
                </div>
              </Show.When>
            </Show>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center p-4 text-gray-600 bg-gray-100 rounded-lg shadow-md">
          <AlertCircle className="w-6 h-6 mr-2 text-gray-500" />
          <span className="text-lg font-bold">No request</span>
        </div>
      )}
    </DataRender>
  );
};

export default WeeklyPlanRequest;

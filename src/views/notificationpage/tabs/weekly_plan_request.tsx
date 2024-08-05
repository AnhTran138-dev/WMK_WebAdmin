import { useState } from "react";
import DataRender from "../../../components/data_render";
import useFetch from "../../../hooks/useFetch";
import { Response } from "../../../models/responses";
import { WeeklyPlanList } from "../../../models/responses/weekly_plan";
import { formatFromISOString, FormatType } from "../../../lib";
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button, ScrollArea } from "../../../components/ui";

const WeeklyPlanRequest = () => {
  const {
    data: weeklyplans,
    loading,
    error,
  } = useFetch<Response<WeeklyPlanList[]>>("/api/weeklyplan/get-all");

  // Filter weekly plans to only include those with processStatus "approved"
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
            <div
              key={plan.id}
              className="relative overflow-hidden transition-shadow duration-300 rounded-lg shadow cursor-pointer bg-primary hover:shadow-xl"
            >
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
                      {formatFromISOString(plan.beginDate, FormatType.DATE)} -{" "}
                      {formatFromISOString(plan.endDate, FormatType.DATE)}
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
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Access
                </Button>
                <Button
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Deny
                </Button>
              </div>
            </div>
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

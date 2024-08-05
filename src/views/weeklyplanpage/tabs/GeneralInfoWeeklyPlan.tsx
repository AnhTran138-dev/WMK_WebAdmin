import React from "react";
import { WeeklyPlanList } from "@/models/responses/weekly_plan";
import { formatFromISOString, FormatType } from "@/lib";

interface GeneralInfoWeeklyPlanProps {
  weeklyPlan: WeeklyPlanList;
}

const GeneralInfoWeeklyPlan: React.FC<GeneralInfoWeeklyPlanProps> = ({
  weeklyPlan,
}) => {
  const formatDate = (dateString: Date | null) => {
    return dateString
      ? formatFromISOString(dateString, FormatType.DATETIME)
      : "N/A";
  };

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-6">
        <div className="flex items-center justify-center">
          <img
            src={weeklyPlan.urlImage}
            alt={weeklyPlan.title}
            className="w-64 h-auto border border-gray-200 rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <p>
            <strong className="font-medium">Description:</strong>{" "}
            {weeklyPlan.description}
          </p>
          <p>
            <strong className="font-medium">Begin Date:</strong>{" "}
            {formatDate(weeklyPlan.beginDate)}
          </p>
          <p>
            <strong className="font-medium">End Date:</strong>{" "}
            {formatDate(weeklyPlan.endDate)}
          </p>
          <p>
            <strong className="font-medium">Created At:</strong>{" "}
            {formatDate(weeklyPlan.createAt)}
            {weeklyPlan.updatedAt && (
              <span className="ml-2 text-gray-600">
                (Updated At: {formatDate(weeklyPlan.updatedAt)})
              </span>
            )}
          </p>
          <p>
            <strong className="font-medium">Created By:</strong>{" "}
            {weeklyPlan.createdBy}
            {weeklyPlan.updatedBy && (
              <span className="ml-2 text-gray-600">
                (Updated By: {weeklyPlan.updatedBy})
              </span>
            )}
          </p>
          <p>
            <strong className="font-medium">Approved At:</strong>{" "}
            {formatDate(weeklyPlan.approvedAt)}
          </p>
          <p>
            <strong className="font-medium">Approved By:</strong>{" "}
            {weeklyPlan.approvedBy}
          </p>
          <p>
            <strong className="font-medium">Process Status:</strong>{" "}
            {weeklyPlan.processStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoWeeklyPlan;

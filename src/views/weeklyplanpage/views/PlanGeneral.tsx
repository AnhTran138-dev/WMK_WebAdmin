import React from "react";
import { WeeklyPlanList } from "../../../models/responses/weekly_plan";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui";
import { formatFromISOString, FormatType } from "../../../lib";
import { Calendar, ClipboardPenLine, User } from "lucide-react";
import { ProcessStatus } from "../../../models/responses/weekly_plan_list";

interface PlanGeneralProps {
  weeklyPlan: WeeklyPlanList;
}

const PlanGeneral: React.FC<PlanGeneralProps> = ({ weeklyPlan }) => {
  const renderStatus = (status: string) => {
    switch (status) {
      case ProcessStatus.Approved:
        return (
          <Badge variant="success" className="text-green-800">
            {status}
          </Badge>
        );
      case ProcessStatus.Processing:
        return <Badge className="text-blue-800 bg-blue-400">{status}</Badge>;
      case ProcessStatus.Denied:
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge className="text-gray-800 bg-gray-200">{status}</Badge>;
    }
  };

  return (
    <Card className="transition-shadow duration-300 shadow-lg hover:shadow-xl">
      <CardHeader>
        <img
          src={weeklyPlan.urlImage}
          alt="plan"
          className="object-cover w-full h-64 rounded-t-lg"
          style={{ objectFit: "cover" }}
        />
      </CardHeader>
      <CardContent className="pt-1">
        <CardTitle className="flex items-center gap-2 ml-2 text-2xl font-semibold">
          {weeklyPlan.title}
          {renderStatus(weeklyPlan.processStatus)}
        </CardTitle>
        <CardDescription className="flex flex-col items-start gap-2 text-gray-600">
          <div className="flex gap-2 ml-3">
            <User size={20} />
            <span>{weeklyPlan.createdBy}</span>
          </div>
          <div className="flex gap-2 ml-3">
            <Calendar size={20} />
            <span>
              {formatFromISOString(weeklyPlan.createAt, FormatType.DATE)}
            </span>
          </div>
          <div className="flex gap-2 ml-3">
            <ClipboardPenLine size={20} />
            <span>{weeklyPlan.description}</span>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default PlanGeneral;

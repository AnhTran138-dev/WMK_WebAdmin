import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  ScrollArea,
  Badge,
  Card,
} from "@/components/ui";
import { formatFromISOString, FormatType } from "@/lib";
import { AlertCircle } from "lucide-react";
import { WeeklyPlanList } from "../../../models/responses/weekly_plan";

interface WeeklyPlanItemProps {
  plan: WeeklyPlanList;
  onApprove: () => void;
  onDeny: () => void;
  onEdit: () => void;
  isStaff: boolean;
}

const WeeklyPlanItem: React.FC<WeeklyPlanItemProps> = ({
  plan,
  onApprove,
  onDeny,
  onEdit,
  isStaff,
}) => {
  return (
    <Accordion type="single" collapsible className="w-full mb-4" key={plan.id}>
      <AccordionItem value={plan.id} className="border rounded-lg shadow-lg">
        <AccordionTrigger className="transition-colors duration-300 rounded-t-lg bg-secondary hover:bg-secondary-light hover:no-underline">
          <div className="grid grid-cols-12 gap-4 p-4">
            <img
              src={plan.urlImage}
              alt={plan.title}
              className="object-cover w-16 h-16 col-span-2 rounded-md"
            />
            <div className="flex flex-col items-start col-span-6">
              <h3 className="text-lg font-semibold text-primary">
                {plan.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {formatFromISOString(plan.beginDate, FormatType.DATE)} -{" "}
                {formatFromISOString(plan.endDate, FormatType.DATE)}
              </p>
              <Badge
                className="mt-1 text-white bg-blue-500"
                variant={isStaff ? "destructive" : "default"}
              >
                {plan.processStatus}
              </Badge>
            </div>
            {!isStaff && (
              <div className="flex items-center justify-end col-span-4 gap-2">
                <Button variant="success" onClick={onApprove}>
                  <AlertCircle className="mr-2" /> Approve
                </Button>
                <Button variant="destructive" onClick={onDeny}>
                  <AlertCircle className="mr-2" /> Deny
                </Button>
              </div>
            )}
            {isStaff && (
              <div className="flex items-center justify-end col-span-4">
                <Button variant="destructive" onClick={onEdit}>
                  <AlertCircle className="mr-2" /> Edit
                </Button>
              </div>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-3 py-2 rounded-b-lg bg-background-light">
          <ScrollArea className="p-4 space-y-4 h-96">
            {plan.recipePLans.map((recipePlan) => (
              <Card
                key={recipePlan.id}
                className="flex items-start gap-4 p-4 transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
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
              </Card>
            ))}
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default WeeklyPlanItem;

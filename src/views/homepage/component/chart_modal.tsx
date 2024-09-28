import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface ChartAlertDialogProps {
  open: boolean;
  onClose: () => void;
  data: { day: string; value: number }[]; // Correct type
}

const ChartAlertDialog: React.FC<ChartAlertDialogProps> = ({
  open,
  onClose,
  data,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogTrigger asChild>
        {/* <Button variant="outline">Show Chart</Button> */}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Previous Week Chart</AlertDialogTitle>
          <AlertDialogDescription>
            This chart displays the total sales for each day of the previous
            week.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4">
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11 }}
              angle={-20}
              textAnchor="end"
            />
            <YAxis
              tick={{ fontSize: 11 }}
              tickFormatter={(value) =>
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(value)
              }
            />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChartAlertDialog;

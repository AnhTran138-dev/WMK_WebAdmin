import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { formatFromISOString, FormatType } from "@/lib";
import { WeeklyPlanList } from "@/models/responses/weekly_plan";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PencilLine, Trash2 } from "lucide-react";
// import { UpdateWeeklyPlan } from "../../models/requests/weekly_plan_request";

const WeeklyPlanColumn = (
  // refresh: () => void,
  // onEdit: (weeklyplan: UpdateWeeklyPlan) => void,
  // onToast: (success: boolean, description: string) => void
): ColumnDef<WeeklyPlanList>[] => [
  {
    header: "No.",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "title",
    header: "Name",
  },
  {
    accessorKey: "beginDate",
    header: "Begin Date",
    cell: ({ row }) => {
      if (
        row.original.beginDate ||
        typeof row.original.beginDate === "string"
      ) {
        return formatFromISOString(row.original.beginDate, FormatType.DATETIME);
      }
      return null;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      if (row.original.endDate || typeof row.original.endDate === "string") {
        return formatFromISOString(row.original.endDate, FormatType.DATETIME);
      }
      return null;
    },
  },
  {
    accessorKey: "createdBy",
    header: "Create By",
  },
  {
    accessorKey: "createAt",
    header: "Create At",
    cell: ({ row }) => {
      if (
        row.original.createAt ||
        typeof row.original.approvedAt === "string"
      ) {
        return formatFromISOString(row.original.createAt, FormatType.DATETIME);
      }
      return null;
    },
  },
  {
    accessorKey: "updatedBy",
    header: "Update By",
  },
  {
    accessorKey: "updatedAt",
    header: "Update At",
    cell: ({ row }) => {
      if (
        row.original.updatedAt ||
        typeof row.original.updatedAt === "string"
      ) {
        return formatFromISOString(row.original.updatedAt, FormatType.DATETIME);
      }
      return null;
    },
  },
  {
    accessorKey: "approvedBy",
    header: "Approve By",
  },
  {
    accessorKey: "approvedAt",
    header: "Approve At",
    cell: ({ row }) => {
      if (
        row.original.approvedAt ||
        typeof row.original.approvedAt === "string"
      ) {
        return formatFromISOString(
          row.original.approvedAt,
          FormatType.DATETIME
        );
      }
      return null;
    },
  },
  {
    accessorKey: "processStatus",
    header: "Status",
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PencilLine className="w-4 h-4 mr-2" />
              Edit Full
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PencilLine className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="w-4 h-4 mr-2" />
              Detele
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default WeeklyPlanColumn;

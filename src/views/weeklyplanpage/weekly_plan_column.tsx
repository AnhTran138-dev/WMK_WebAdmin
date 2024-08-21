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
import { WeeklyPlanRequest } from "@/models/requests";
import { WeeklyPlanList } from "@/models/responses/weekly_plan";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  PencilLine,
  ReceiptText,
  Trash2,
} from "lucide-react";

const WeeklyPlanColumn = (
  onEdit: (weeklyplan: WeeklyPlanRequest) => void,
  handleID: (id: string) => void,
  handleType: (type: string) => void
): ColumnDef<WeeklyPlanList>[] => [
  {
    header: "No.",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "urlImage",
    header: "Image",
    cell: ({ row }) => (
      <img
        src={row.original.urlImage}
        alt={row.original.title}
        className="object-cover rounded-md size-32"
      />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "beginDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Begin Date
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Process Status
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const weeklyplan = row.original;
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
            <DropdownMenuItem
              onClick={() => {
                handleID(weeklyplan.id);
                handleType("detail");
              }}
            >
              <ReceiptText className="w-4 h-4 mr-2" />
              Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                onEdit({
                  id: weeklyplan.id,
                  title: weeklyplan.title,
                  description: weeklyplan.description,
                  urlImage: weeklyplan.urlImage,
                  recipeIds: weeklyplan.recipePLans.map((recipe) => {
                    return {
                      recipeId: recipe.recipeId,
                      quantity: recipe.quantity,
                      dayInWeek: recipe.dayInWeek,
                      mealInDay: recipe.mealInDay,
                    };
                  }),
                });
              }}
            >
              <PencilLine className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleID(weeklyplan.id);
                handleType("delete");
              }}
            >
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

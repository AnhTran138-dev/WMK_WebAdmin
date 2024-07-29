import { ColumnDef } from "@tanstack/react-table";
import { RecipeList } from "../../models/responses/recipe_list";
import { formatFromISOString, FormatType } from "../../lib";
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui";
import { ArrowUpDown, MoreHorizontal, PencilLine, Trash2 } from "lucide-react";

const RecipeColumn = (): ColumnDef<RecipeList>[] => [
  {
    header: "No.",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.img}
          alt={row.original.name}
          className="object-cover rounded-md size-32"
        />
      );
    },
  },
  {
    accessorKey: "name",
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
    cell: ({ row }) => {
      const status = row.original.processStatus.toLowerCase();

      if (status === "approved") {
        return <Badge className="success">Approved</Badge>;
      }

      if (status === "processing") {
        return <Badge>Processing</Badge>;
      }

      if (status === "denied") {
        return <Badge>Denied</Badge>;
      }
      if (status === "customer") {
        return <Badge>Customer</Badge>;
      }

      if (status === "cancel") {
        return <Badge variant="destructive">Cancel</Badge>;
      }
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return formatFromISOString(row.original.createdAt, FormatType.DATETIME);
    },
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "servingSize",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Serving Size
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "cookingTime",
    header: "Time",
  },
  {
    accessorKey: "approvedAt",
    header: "Approved At",
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
    accessorKey: "approvedBy",
    header: "Approved By",
  },
  {
    accessorKey: "popularity",
    header: "Popularity",
  },
  {
    accessorKey: "price",
    header: "Price",
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

export default RecipeColumn;

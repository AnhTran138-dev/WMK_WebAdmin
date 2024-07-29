import { ColumnDef } from "@tanstack/react-table";
import { CategoriesIngredient } from "../../../models/responses";
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui";
import { MoreHorizontal, PencilLine, Trash2 } from "lucide-react";

export const CategoriesIngredientColumn =
  (): ColumnDef<CategoriesIngredient>[] => [
    {
      header: "ID",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status.toLowerCase();

        if (status === "available") {
          return <Badge variant="success">Avaliable</Badge>;
        }

        if (status === "unavailable") {
          return <Badge variant="destructive">Unavaliable</Badge>;
        }
      },
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

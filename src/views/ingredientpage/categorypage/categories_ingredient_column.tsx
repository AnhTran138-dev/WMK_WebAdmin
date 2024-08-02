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
import {
  CircleMinus,
  MoreHorizontal,
  PencilLine,
  ScanEye,
  Trash2,
} from "lucide-react";
import { CategoryRequest } from "../../../models/requests";
import { IngredientApi } from "../../../features";
import Show from "../../../lib/show";

export const CategoriesIngredientColumn = (
  handleEdit: (category: CategoryRequest) => void,
  onToast: (success: boolean, description: string) => void,
  refetch: () => void
): ColumnDef<CategoriesIngredient>[] => [
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
    cell: ({ row }) => {
      const category = row.original;
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
              onClick={async () => {
                const result =
                  await IngredientApi.category.changeStatusCategory(
                    category.id,
                    category.status.toLocaleLowerCase() === "unavailable"
                      ? 0
                      : 1
                  );
                if (result) {
                  onToast(true, "Delete category successfully");
                  refetch();
                } else {
                  onToast(false, "Delete category failed");
                  refetch();
                }
              }}
            >
              <Show>
                <Show.When
                  isTrue={category.status.toLocaleLowerCase() === "unavailable"}
                >
                  <ScanEye className="w-4 h-4 mr-2" />
                  Available
                </Show.When>
                <Show.Else>
                  <CircleMinus className="w-4 h-4 mr-2" />
                  Unavailable
                </Show.Else>
              </Show>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleEdit({
                  id: category.id,
                  name: category.name,
                  description: category.description,
                });
              }}
            >
              <PencilLine className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const success = await IngredientApi.category.deleteCategory(
                  category.id
                );
                if (success) {
                  onToast(success, `Delete ${category.name} success`);
                  refetch();
                } else {
                  onToast(success, `Delete ${category.name} failed`);
                  refetch();
                }
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

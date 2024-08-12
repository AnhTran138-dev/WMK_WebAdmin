import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { IngredientApi } from "@/features";
import Show from "@/lib/show";
import { CategoryRequest } from "@/models/requests";
import { CategoriesIngredient, Response } from "@/models/responses";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleMinus,
  MoreHorizontal,
  PencilLine,
  ScanEye,
  Trash2,
} from "lucide-react";

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
                const result: Response<null> =
                  await IngredientApi.category.changeStatusCategory(
                    category.id,
                    category.status.toLocaleLowerCase() === "unavailable"
                      ? 0
                      : 1
                  );

                console.log(result);

                if (result.statusCode === 200) {
                  onToast(true, result.message);
                  refetch();
                } else {
                  onToast(false, result.message);
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
                const result: Response<null> =
                  await IngredientApi.category.deleteCategory(category.id);
                if (result.statusCode === 200) {
                  onToast(true, result.message);
                  refetch();
                }

                if (result.statusCode === 400) {
                  onToast(false, result.message);
                  refetch();
                }

                if (result.statusCode === 404) {
                  onToast(false, result.message);
                  refetch();
                }

                if (result.statusCode === 500) {
                  onToast(false, result.message);
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

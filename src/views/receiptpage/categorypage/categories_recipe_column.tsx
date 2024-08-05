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
import { recipeApi } from "@/features";
import Show from "@/lib/show";
import { CategoryRequest } from "@/models/requests";
import { CategoriesRecipe, Response } from "@/models/responses";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  CircleMinus,
  MoreHorizontal,
  PencilLine,
  ScanEye,
  Trash2,
} from "lucide-react";

export const CategoriesRecipeColumns = (
  handleEdit: (category: CategoryRequest) => void,
  onToast: (success: boolean, description: string) => void,
  refetch: () => void
): ColumnDef<CategoriesRecipe>[] => [
  {
    header: "ID",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
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
      const catogory = row.original;

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
                const result = await recipeApi.category.changeCategoryStatus(
                  catogory.id,
                  catogory.status.toLocaleLowerCase() === "unavailable" ? 0 : 1
                );
                if (result) {
                  onToast(
                    true,
                    `Change category status of ${catogory.name} successfully`
                  );
                  refetch();
                } else {
                  onToast(
                    false,
                    `Change category status of ${catogory.name} failed`
                  );
                  refetch();
                }
              }}
            >
              <Show>
                <Show.When
                  isTrue={catogory.status.toLocaleLowerCase() === "unavailable"}
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
                  id: catogory.id,
                  name: catogory.name,
                  description: catogory.description,
                });
              }}
            >
              <PencilLine className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const result: Response<null> =
                  await recipeApi.category.deleteCategory(catogory.id);

                if (result.statusCode === 200) {
                  onToast(true, result.message);
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

                if (result.statusCode === 400) {
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

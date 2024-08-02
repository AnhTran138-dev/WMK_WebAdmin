import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui";
import { recipeApi } from "@/features";
import { formatFromISOString, FormatType } from "@/lib";
import { RecipeRequest } from "@/models/requests";
import { RecipeList } from "@/models/responses/recipe_list";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, PencilLine, Trash2 } from "lucide-react";

const statusList = [
  { id: 0, name: "Processing" },
  // { id: 1, name: "Approved" },
  // { id: 2, name: "Denied" },
  // { id: 3, name: "Customer" },
  { id: 4, name: "Cancel" },
];

const RecipeColumn = (
  refetch: () => void,
  handleEdit: (recipe: RecipeRequest) => void,
  handleToast: (success: boolean, description: string) => void
): ColumnDef<RecipeList>[] => [
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
        return <Badge variant="success">Approved</Badge>;
      }

      if (status === "processing") {
        return (
          <Badge className="text-white bg-blue-400 hover:bg-blue-400 hover:text-white">
            Processing
          </Badge>
        );
      }

      if (status === "denied") {
        return (
          <Badge className="text-white bg-slate-600 hover:bg-slate-600 hover:text-white">
            Denied
          </Badge>
        );
      }
      if (status === "customer") {
        return (
          <Badge className="text-white bg-violet-400 hover:bg-violet-400 hover:text-white">
            Customer
          </Badge>
        );
      }

      if (status === "cancel") {
        return (
          <Badge
            variant="destructive"
            className="hover:bg-destructive hover:text-white"
          >
            Cancel
          </Badge>
        );
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
    accessorKey: "notice",
    header: "Notice",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const recipe: RecipeList = row.original;
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
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <PencilLine className="w-4 h-4 mr-2" />
                  Status
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {statusList.map((status) => (
                      <DropdownMenuItem
                        key={status.id}
                        onClick={async () => {
                          console.log(status.name);

                          const result = await recipeApi.changeStatusRecipe(
                            recipe.id,
                            status.id,
                            "123"
                          );

                          if (!result) {
                            handleToast(false, "Change status failed");
                            refetch();
                          } else {
                            handleToast(true, "Change status successfully");
                            refetch();
                          }
                        }}
                      >
                        {status.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                handleEdit({
                  id: recipe.id,
                  name: recipe.name,
                  description: recipe.description,
                  recipeIngredientsList: recipe.recipeIngredients.map(
                    (ingredient) => {
                      return {
                        ingredientId: ingredient.ingredientId,
                        amount: ingredient.amount,
                      };
                    }
                  ),
                  img: recipe.img,
                  servingSize: recipe.servingSize,
                  cookingTime: recipe.cookingTime,
                  createdBy: recipe.createdBy,
                  difficulty: recipe.difficulty,
                  categoryIds: recipe.recipeCategories.map(
                    (category) => category.categoryId
                  ),
                  steps: recipe.recipeSteps.map((step) => {
                    return {
                      id: step.id,
                      index: step.index,
                      name: step.name,
                      mediaURL: step.imageLink,
                      description: step.description,
                      imageLink: step.imageLink,
                    };
                  }),
                });
              }}
            >
              <PencilLine className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const result = await recipeApi.deleteRecipe(recipe.id);

                if (!result) {
                  handleToast(false, "Delete recipe failed");
                  refetch();
                }
                handleToast(true, "Delete recipe successfully");
                refetch();
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

export default RecipeColumn;

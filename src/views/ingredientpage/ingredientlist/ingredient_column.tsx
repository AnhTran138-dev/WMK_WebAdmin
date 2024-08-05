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
import { formatTotal } from "@/lib/utils/formatPrice";
import { IngredientRequest } from "@/models/requests";
import { IngredientsList, Response } from "@/models/responses";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  CircleMinus,
  MoreHorizontal,
  PencilLine,
  ReceiptText,
  ScanEye,
  Trash2,
} from "lucide-react";

const IngredientColumn = (
  handleEdit: (ingredent: IngredientRequest) => void,
  onToast: (success: boolean, description: string) => void,
  refetch: () => void,
  handleDetail: (id: string) => void
): ColumnDef<IngredientsList>[] => [
  {
    header: "No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Image",
    accessorKey: "img",
    cell: ({ row }) => (
      <img
        src={row.original.img}
        alt={row.original.name}
        className="object-cover rounded-md size-32"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "ingredientCategory.name",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <span>{formatTotal(row.original.price)} VND</span>;
    },
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status.toLocaleLowerCase();

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
      const ingredent = row.original;

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
                const result = await IngredientApi.changeStatusIngredient(
                  ingredent.id,
                  ingredent.status.toLocaleLowerCase() === "unavailable" ? 0 : 1
                );
                if (result) {
                  onToast(true, `Change status ${ingredent.name} success`);
                  refetch();
                } else {
                  onToast(false, `Change status ${ingredent.name} failed`);
                  refetch();
                }
              }}
            >
              <Show>
                <Show.When
                  isTrue={
                    ingredent.status.toLocaleLowerCase() === "unavailable"
                  }
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
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDetail(ingredent.id)}>
              <ReceiptText className="w-4 h-4 mr-2" />
              Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleEdit({
                  id: ingredent.id,
                  nutrientInfo: {
                    calories: ingredent.ingredientNutrient.calories,
                    fat: ingredent.ingredientNutrient.fat,
                    saturatedFat: ingredent.ingredientNutrient.saturatedFat,
                    sugar: ingredent.ingredientNutrient.sugar,
                    carbonhydrate: ingredent.ingredientNutrient.carbonhydrate,
                    dietaryFiber: ingredent.ingredientNutrient.dietaryFiber,
                    protein: ingredent.ingredientNutrient.protein,
                    sodium: ingredent.ingredientNutrient.sodium,
                  },
                  packagingMethod: ingredent.packagingMethod,
                  preservationMethod: ingredent.preservationMethod,
                  name: ingredent.name,
                  price: ingredent.price,
                  unit: ingredent.unit,
                  img: ingredent.img,
                  ingredientCategoryId: ingredent.ingredientCategory.id,
                });
              }}
            >
              <PencilLine className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const isDelete: Response<null> =
                  await IngredientApi.deleteIngredient(ingredent.id);

                if (isDelete.statusCode === 200) {
                  onToast(true, isDelete.message);
                  refetch();
                }

                if (isDelete.statusCode !== 200) {
                  onToast(false, isDelete.message);
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

export default IngredientColumn;

import { ColumnDef } from "@tanstack/react-table";
import { IngredientsList } from "../../../models/responses";
import { formatTotal } from "../../../lib/utils/formatPrice";
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

const IngredientColumn = (): ColumnDef<IngredientsList>[] => [
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
    header: "Status",
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

export default IngredientColumn;

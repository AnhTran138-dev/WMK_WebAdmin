import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PencilLine, Trash2 } from "lucide-react";
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
import { OrderList } from "@/models/responses/order_list";

const OrderColum = (): ColumnDef<OrderList>[] => [
  {
    header: "No.",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "orderCode",
    header: "Order Code",
  },
  {
    accessorKey: "orderDate",
    header: "Date Order",
    cell: ({ row }) => {
      if (
        row.original.orderDate ||
        typeof row.original.orderDate === "string"
      ) {
        return formatFromISOString(row.original.orderDate, FormatType.DATETIME);
      }
      return null;
    },
  },
  {
    accessorKey: "shipDate",
    header: "Date Ship",
    cell: ({ row }) => {
      if (row.original.shipDate || typeof row.original.shipDate === "string") {
        return formatFromISOString(row.original.shipDate, FormatType.DATETIME);
      }
      return null;
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Price",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "userId",
    header: "Customer",
  },
  {
    accessorKey: "status",
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
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="w-4 h-4 mr-2" />
              Change status
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default OrderColum;

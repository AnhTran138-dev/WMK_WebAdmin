import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { OrderGroupList } from "@/models/responses/order_group_list";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PencilLine, ReceiptText, Trash2 } from "lucide-react";
import { formatFromISOString, FormatType } from "../../lib";

const OrderGroupColumn = (
  onToast: (success: boolean, description: string) => void,
  handleDialog: (type: string) => void,
  handleDetail: (id: string) => void,
  refetch: () => void
): ColumnDef<OrderGroupList>[] => [
  {
    header: "No.",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "shipperId",
    header: "Shipper Id",
  },
  {
    accessorKey: "coordinates",
    header: "Coordinates",
  },
  {
    accessorKey: "asignAt",
    header: "Asign At",
    cell: ({ row }) => {
      return formatFromISOString(row.original.asignAt, FormatType.DATETIME);
    },
  },
  {
    accessorKey: "asignBy",
    header: "Asign By",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    id: "action",
    cell: ({ row }) => {
      const order_group = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                handleDialog("detail");
                handleDetail(order_group.id);
              }}
            >
              <ReceiptText className="mr-2 size-4" />
              Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleDialog("edit");
              }}
            >
              <PencilLine className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const success = true;
                onToast(success, "Delete user");
                refetch();
              }}
            >
              <Trash2 className="mr-2 size-4" />
              Detele
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default OrderGroupColumn;

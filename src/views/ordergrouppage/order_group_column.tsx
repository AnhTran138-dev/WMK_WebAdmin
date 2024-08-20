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
import Show from "@/lib/show";
import { OrderGroupRequest } from "@/models/requests";
import { OrderGroupList } from "@/models/responses/order_group_list";
import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  PencilLine,
  ReceiptText,
  ShieldCheck,
  ShieldX,
  Trash2,
} from "lucide-react";

const OrderGroupColumn = (
  handleDialog: (type: string) => void,
  handleDetail: (id: string) => void,
  handleEdit: (orderGroup: OrderGroupRequest) => void,
  changeStatus: (id: string, status: number) => void
): ColumnDef<OrderGroupList>[] => [
  {
    header: "No.",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "shipperUserName",
    header: "Shipper Name",
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div>
          <Show>
            <Show.When isTrue={parseInt(row.original.status) === 0}>
              <ShieldCheck className="text-green-500" />
            </Show.When>
            <Show.Else>
              <ShieldX className="text-red-500" />
            </Show.Else>
          </Show>
        </div>
      );
    },
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
            <Show>
              <Show.When isTrue={parseInt(order_group.status) === 0}>
                <DropdownMenuItem
                  onClick={() => changeStatus(order_group.id, 1)}
                >
                  Unvailable
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </Show.When>
              {/* <Show.When isTrue={parseInt(order_group.status) === 1}>
                <DropdownMenuItem
                  onClick={() => changeStatus(order_group.id, 0)}
                >
                  Available
                </DropdownMenuItem>
              </Show.When> */}
            </Show>
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
                handleEdit({
                  id: order_group.id,
                  shipperId: order_group.shipperId,
                  location: order_group.location,
                  longitude: order_group.longitude,
                  latitude: order_group.latitude,
                });
              }}
            >
              <PencilLine className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleDialog("delete");
                handleDetail(order_group.id);
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

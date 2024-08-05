import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui";
import { OrderApi } from "@/features";
import { formatFromISOString, FormatType } from "@/lib";
import Show from "@/lib/show";
import { OrderGroupList, Response } from "@/models/responses";
import { OrderList } from "@/models/responses/order_list";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  CircleDollarSign,
  CircleX,
  Group,
  MoreHorizontal,
  ReceiptText,
  Trash2,
  Truck,
} from "lucide-react";
import { OrderStatus } from "../../models/requests/order_request";

const statusList = [
  {
    value: OrderStatus.Shipping,
    label: "Shipping",
    icon: <Truck className="mr-4 size-4" />,
  },
  {
    value: OrderStatus.Canceled,
    label: "Canceled",
    icon: <CircleX className="mr-4 size-4 " />,
  },
  {
    value: OrderStatus.Refund,
    label: "Refund",
    icon: <CircleDollarSign className="mr-4 size-4" />,
  },
];

const OrderColum = (
  refetch: () => void,
  handleDialog: (id: string, status: number) => void,
  handleToast: (success: boolean, description: string) => void,
  handleDetail: (id: string) => void,
  orderGroup: OrderGroupList[]
): ColumnDef<OrderList>[] => [
  {
    header: "No.",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "orderCode",
    header: "Order Code",
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Date
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ship Date
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (row.original.shipDate || typeof row.original.shipDate === "string") {
        return formatFromISOString(row.original.shipDate, FormatType.DATETIME);
      }
      return null;
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Price
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },

  {
    accessorKey: "userId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "receiveName",
    header: "Receiver Name",
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
      const status = row.original.status.toLowerCase();

      if (status === "refund") {
        return <Badge className="text-white bg-slate-500">Refund</Badge>;
      }
      if (status === "processing") {
        return <Badge className="text-white bg-blue-500">Proccessing</Badge>;
      }
      if (status === "canceled") {
        return <Badge variant="destructive">Canceled</Badge>;
      }
      if (status === "shipping") {
        return <Badge variant="success">Shipping</Badge>;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDetail(order.id)}>
              <ReceiptText className="w-4 h-4 mr-4" />
              Detail
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {statusList.map((status) => (
              <Show key={status.value}>
                <Show.When
                  isTrue={
                    status.label.toLowerCase() !== order.status.toLowerCase()
                  }
                >
                  <DropdownMenuItem
                    onClick={() => {
                      handleDialog(order.id, status.value);
                    }}
                  >
                    {status.icon}
                    {status.label}
                  </DropdownMenuItem>
                </Show.When>
              </Show>
            ))}
            <DropdownMenuSeparator />
            {/* <DropdownMenuGroup> */}
            <Show>
              <Show.When isTrue={order.status.toLowerCase() === "proccessing"}>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Group className="w-4 h-4 mr-4" />
                    Group
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <Command>
                      <CommandInput placeholder="Group Name" />
                      <CommandList>
                        <CommandEmpty>No group</CommandEmpty>
                        <CommandGroup>
                          {orderGroup?.map((group) => (
                            <Show key={group.id}>
                              <Show.When
                                isTrue={group.id !== order.orderGroupId}
                              >
                                <CommandItem
                                  value={group.location}
                                  onSelect={async () => {
                                    const response: Response<null> =
                                      await OrderApi.groupOrder(
                                        order.id,
                                        group.id
                                      );

                                    if (response.statusCode === 200) {
                                      handleToast(true, response.message);
                                      refetch();
                                    }

                                    if (response.statusCode !== 200) {
                                      handleToast(false, response.message);
                                    }
                                  }}
                                >
                                  {group.location}
                                </CommandItem>
                              </Show.When>
                            </Show>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </Show.When>
            </Show>
            {/* </DropdownMenuGroup> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                const response: Response<null> = await OrderApi.deleteOrder(
                  order.id
                );

                if (response.statusCode === 200) {
                  handleToast(true, response.message);
                  refetch();
                }

                if (response.statusCode !== 200) {
                  handleToast(false, response.message);
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default OrderColum;

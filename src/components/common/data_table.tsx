"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { TokenResponse } from "@/models/responses";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { jwtDecode } from "jwt-decode";
import { AlertCircle, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchColumn?: string;
  handleCreate?: () => void;
  handleCluster?: () => void;
  handleReset?: () => void;
  sortUser?: (role: string, selected: boolean) => void;
  selectedRoles?: string[];
  changeStatus?: boolean;
  handleChangeStatus?: (status: boolean) => void;
  disable?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchColumn,
  handleCreate,
  handleCluster,
  handleReset,
  sortUser,
  selectedRoles = [],
  changeStatus,
  handleChangeStatus,
  disable,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<boolean>(changeStatus!);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  useEffect(() => {
    setStatus(changeStatus!);
  }, [changeStatus]);

  useEffect(() => {
    const token: TokenResponse = jwtDecode(
      localStorage.getItem("token") as string
    );

    if (token) {
      setRole(
        token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );
    }
  }, []);

  const renderRoleMenuItems = () => {
    const availableRoles =
      role === "Staff"
        ? ["Shipper", "Customer"]
        : role === "Manager"
        ? ["Staff", "Shipper", "Customer"]
        : ["Shipper", "Customer", "Staff"];

    return availableRoles.map((role) => (
      <DropdownMenuCheckboxItem
        key={role}
        checked={selectedRoles.includes(role)}
        onCheckedChange={(isChecked) => {
          if (sortUser) sortUser(role, isChecked);
        }}
      >
        {role}
      </DropdownMenuCheckboxItem>
    ));
  };

  const onClickChange = (status: boolean) => {
    setStatus(status);
    handleChangeStatus?.(status);
  };

  return (
    <div>
      <div className="flex items-center py-4">
        {searchColumn && (
          <Input
            placeholder={`Search ${searchColumn}...`}
            value={
              (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}
        <div className="flex gap-2 ml-auto">
          {handleChangeStatus && (
            <Button onClick={() => onClickChange(status)} disabled={disable}>
              {!status ? (
                <div className="flex items-center gap-2">
                  <LockKeyhole />
                  <span>Close</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LockKeyholeOpen />
                  <span>Open</span>
                </div>
              )}
            </Button>
          )}
          {handleReset && <Button onClick={handleReset}>Reset</Button>}
          {handleCluster && <Button onClick={handleCluster}>Cluster</Button>}
          {handleCreate && <Button onClick={handleCreate}>Create New</Button>}
          {sortUser && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Role
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {renderRoleMenuItems()}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-100 hover:bg-gray-100"
                      : "bg-white"
                  }
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center justify-center h-full py-10">
                    <AlertCircle className="w-16 h-16 mb-4 text-gray-400" />
                    <p className="text-lg font-medium text-center text-gray-500">
                      No Data Found
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

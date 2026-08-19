"use client";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  createColumnHelper,
  useTable,
} from "@tanstack/react-table";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiErrorWarningLine,
  RiCloseCircleLine,
  RiDeleteBinLine,
  RiSearch2Line,
  RiMoreLine,
} from "@remixicon/react";
import { useId, useRef, useState, useTransition } from "react";
import { AdminDoctorType } from "@/app/data/admin/admin-data-service";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";
import { deleteDoctors } from "../actions";
import { ChevronLeft, ChevronRight, Eye, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  adminTableFeatures,
  columnFilterText,
  type AdminTableFeatures,
} from "@/app/(admin)/_lib/admin-table-features";

const columnHelper = createColumnHelper<AdminTableFeatures, AdminDoctorType>();

const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 28,
    enableSorting: false,
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-3">
        <div className="font-medium">{getValue()}</div>
      </div>
    ),
    size: 180,
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{getValue()}</span>
    ),
    size: 150,
  }),
  columnHelper.accessor((row) => row.doctor.map(({ clinic }) => clinic), {
    id: "clinic",
    header: "Clinic",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">
        {previewJoinedValues(getValue(), 2)}
      </span>
    ),
    size: 130,
  }),
  columnHelper.accessor(
    (row) => row.doctor.map(({ department }) => department),
    {
      id: "department",
      header: "Department",
      cell: ({ getValue }) => (
        <span className="text-muted-foreground">
          {previewJoinedValues(getValue(), 3)}
        </span>
      ),
      size: 180,
    },
  ),
  columnHelper.accessor((row) => row.doctor.map(({ study }) => study), {
    id: "studies",
    header: "Studies",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">
        {previewJoinedValues(getValue(), 3)}
      </span>
    ),
    size: 180,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row, table }) => {
      const meta = table.options.meta;
      if (!meta) {
        return null;
      }

      return (
        <RowActions
          item={row.original}
          isPending={meta.isPending}
          onDelete={meta.onDelete}
        />
      );
    },
    size: 60,
    enableSorting: false,
  }),
]);

function previewJoinedValues(values: string[], previewCount: number) {
  if (values.length <= 2) {
    return values.join(", ");
  }

  return `${values.slice(0, previewCount).join(", ")}...`;
}

type DoctorsTableProps = {
  doctors: AdminDoctorType[];
};

export default function DoctorsTable({ doctors }: DoctorsTableProps) {
  const [isPending, startTransition] = useTransition();
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);
  const [removedIds, setRemovedIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const data = doctors.filter((doctor) => !removedIds.has(doctor.id));

  const table = useTable({
    features: adminTableFeatures,
    data,
    columns,
    getRowId: (row) => row.id,
    enableSortingRemoval: false,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      pagination,
      columnFilters,
      rowSelection,
    },
    meta: {
      isPending,
      onDelete: handleDeleteIds,
    },
  });

  function handleDeleteIds(ids: string[]) {
    if (ids.length === 0) {
      return;
    }

    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteDoctors(ids));

      if (error) {
        toast.error("An unexpected error occured");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        setRemovedIds((current) => {
          const next = new Set(current);
          for (const id of ids) {
            next.add(id);
          }
          return next;
        });
        table.resetRowSelection();
        return;
      }

      toast.error(result.message);
    });
  }

  const nameFilter = columnFilterText(
    table.getColumn("name")?.getFilterValue(),
  );
  const selectedCount = table.getSelectedRowModel().rows.length;
  const rows = table.getRowModel().rows;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                "peer min-w-60 ps-9 bg-background bg-linear-to-br from-accent/60 to-accent",
                nameFilter !== "" && "pe-9",
              )}
              value={nameFilter}
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
              placeholder="Search by name"
              type="text"
              aria-label="Search by name"
            />
            <div className="pointer-events-none absolute inset-y-0 inset-s-0 flex items-center justify-center ps-2 text-muted-foreground/60 peer-disabled:opacity-50">
              <RiSearch2Line size={20} aria-hidden="true" />
            </div>
            {nameFilter !== "" && (
              <button
                className="absolute inset-y-0 inset-e-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/60 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Clear filter"
                onClick={() => {
                  table.getColumn("name")?.setFilterValue("");
                  inputRef.current?.focus();
                }}
              >
                <RiCloseCircleLine size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {selectedCount > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="ml-auto" variant="outline">
                <RiDeleteBinLine
                  className="-ms-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Delete
                <span className="-me-1 ms-1 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                  {selectedCount}
                </span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
                  aria-hidden="true"
                >
                  <RiErrorWarningLine className="opacity-80" size={16} />
                </div>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete{" "}
                    {selectedCount} selected {selectedCount === 1 ? "row" : "rows"}
                    .
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    handleDeleteIds(
                      table
                        .getSelectedRowModel()
                        .rows.map((row) => row.original.id),
                    )
                  }
                  className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <Table className="table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                const sorted = header.column.getIsSorted();

                return (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg"
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className="flex h-full cursor-pointer select-none items-center gap-2"
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }}
                        tabIndex={0}
                      >
                        <table.FlexRender header={header} />
                        {sorted === "asc" ? (
                          <RiArrowUpSLine
                            className="shrink-0 opacity-60"
                            size={16}
                            aria-hidden="true"
                          />
                        ) : sorted === "desc" ? (
                          <RiArrowDownSLine
                            className="shrink-0 opacity-60"
                            size={16}
                            aria-hidden="true"
                          />
                        ) : null}
                      </div>
                    ) : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <tbody aria-hidden="true" className="table-row h-1"></tbody>
        <TableBody>
          {rows.length ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50"
              >
                {row.getAllCells().map((cell) => (
                  <TableCell key={cell.id} className="last:py-0 h-[inherit]">
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <tbody aria-hidden="true" className="table-row h-1"></tbody>
      </Table>

      {rows.length > 0 && (
        <div className="flex items-center justify-between gap-3">
          <p
            className="flex-1 whitespace-nowrap text-sm text-muted-foreground"
            aria-live="polite"
          >
            Page{" "}
            <span className="text-foreground">
              {table.state.pagination.pageIndex + 1}
            </span>{" "}
            of <span className="text-foreground">{table.getPageCount()}</span>
          </p>
          <Pagination className="w-auto">
            <PaginationContent className="gap-3">
              <PaginationItem>
                <Button
                  variant="outline"
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  <ChevronLeft className="size-4 text-primary" />{" "}
                  <span>Previous</span>
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  <span>Next</span>{" "}
                  <ChevronRight className="size-4 text-primary" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

function RowActions({
  item,
  isPending,
  onDelete,
}: {
  item: AdminDoctorType;
  isPending: boolean;
  onDelete: (ids: string[]) => void;
}) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-end">
            <Button
              size="icon"
              variant="ghost"
              className="shadow-none text-muted-foreground/60"
              aria-label="Edit item"
            >
              <RiMoreLine className="size-5" size={20} aria-hidden="true" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => router.push(`/admin/doctors/${item.id}`)}
              disabled={isPending}
            >
              <Eye className="size-4" /> View
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
            <RiDeleteBinLine
              className="-ms-1 opacity-60"
              size={16}
              aria-hidden="true"
            />{" "}
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              contact.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete([item.id]);
                setShowDeleteDialog(false);
              }}
              disabled={isPending}
              className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin ml-1" size={16} /> Deleting...
                </>
              ) : (
                <span>Delete</span>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

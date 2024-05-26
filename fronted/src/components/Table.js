import React, { useMemo, useState } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  TextField,
  Button,
  Link,
  CircularProgress,
} from "@mui/material";

// Define a default UI for filtering
const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length;

  return (
    <TextField
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
      variant="outlined"
      size="small"
      margin="dense"
    />
  );
};

const TableDate = ({ data }) => {
  const isLoading = data?.length === 0;

  const columns = useMemo(
    () => [
      {
        Header: "Sector",
        accessor: "sector",
        Filter: DefaultColumnFilter,
      },
      {
        Header: "Pestle",
        accessor: "pestle",
        Filter: DefaultColumnFilter,
      },
      {
        Header: "Topic",
        accessor: "topic",
        Filter: DefaultColumnFilter,
      },
      {
        Header: "Region",
        accessor: "region",
        Filter: DefaultColumnFilter,
      },
      {
        Header: "End Year",
        accessor: "end_year",
        Filter: DefaultColumnFilter,
      },
      {
        Header: "Source",
        accessor: "source",
        Filter: DefaultColumnFilter,
      },
      {
        Header: "Counrty",
        accessor: "country",
        Filter: DefaultColumnFilter,
      },
      {
        Header: "Insight",
        accessor: "insight",
        Filter: DefaultColumnFilter,
      },
      {
        Header: "URL",
        accessor: "url",
        Cell: ({ cell: { value } }) => (
          <Link href={value} target="_blank" rel="noopener">
            URL
          </Link>
        ),
      },
    ],
    []
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Instead of using rows, we'll use page
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex, pageSize },
    prepareRow,
    setFilter,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 }, // Pass our initial table state
    },
    useFilters,
    usePagination // Use the usePagination plugin hook
  );

  return (
    <TableContainer component={Paper} style={{ margin: "20px 0" }}>
      <MuiTable {...getTableProps()} size="small">
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              // Use page instead of rows
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        )}

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={5}
              count={data.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              onPageChange={(e, newPage) => setPageSize(newPage)}
              onRowsPerPageChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              ActionsComponent={() => (
                <div style={{ flexShrink: 0, marginLeft: "2.5em" }}>
                  <Button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    Previous
                  </Button>
                  <Button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                  </Button>
                </div>
              )}
            />
          </TableRow>
        </TableFooter>
      </MuiTable>
    </TableContainer>
  );
};

export default TableDate;

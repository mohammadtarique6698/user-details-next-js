import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

const TableComponent = ({ columns, data }) => {
  const [sorting, setSorting] = useState([{ id: "name", desc: false }]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id,
    filterFns: {
      globalText: (row, columnIds, filterValue) => {
        if (!filterValue) return true; // Return all rows if no filter value
        return row.getAllCells().some((cell) => {
          const cellValue = cell.getValue();
          return String(cellValue)
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        });
      },
    },
    globalFilterFn: "globalText",
  });

  const handleColumnFilterChange = (e) => {
    const { value } = e.target;
    setColumnFilters([{ id: "name", value }]);
  };

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex flex-row justify-between">
        <div className="mb-4 flex gap-2 items-center w-1/2">
          <label htmlFor="name">Global Search:</label>
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search across all columns..."
            className="border border-gray-300 px-4 py-2 rounded-md w-1/2"
          />
        </div>

        <div className="mb-4 flex space-x-4">
          <div key="name" className="flex items-center">
            <label htmlFor="name" className="mr-2">
              Search by Name:
            </label>
            <input
              type="text"
              id="name"
              value={columnFilters[0]?.value || ""}
              onChange={handleColumnFilterChange}
              className="border border-gray-300 px-4 py-2 rounded-md"
              placeholder="Filter by Name"
            />
          </div>
        </div>
      </div>

      <div className="mb-4 flex justify-between">
        <div>
          <label htmlFor="sort-by-name" className="mr-2">
            Sort by Name in:
          </label>
          <select
            id="sort-by-name"
            onChange={(e) => {
              const value = e.target.value;
              setSorting([{ id: "name", desc: value === "desc" }]);
            }}
            className="bg-white border border-gray-300 px-4 py-2 rounded-md"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left font-semibold text-gray-600 border-b border-gray-300"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No records found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-3 border-b border-gray-200 text-gray-600"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <div>
          <button
            onClick={() =>
              setPagination({
                pageIndex: pagination.pageIndex - 1,
                pageSize: pagination.pageSize,
              })
            }
            disabled={pagination.pageIndex === 0}
            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4">
            Page {pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button
            onClick={() =>
              setPagination({
                pageIndex: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
              })
            }
            disabled={pagination.pageIndex === table.getPageCount() - 1}
            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;

// import React, { useState } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   flexRender,
//   getSortedRowModel,
//   getFilteredRowModel,
// } from "@tanstack/react-table";

// // TableComponent is a reusable component to display a table with sorting, filtering, pagination, and global search functionality.
// const TableComponent = ({ columns, data }) => {
//   // State management for sorting, pagination, column-specific filters, and global filter.
//   const [sorting, setSorting] = useState([{ id: "name", desc: false }]); // Initial sorting by 'name' in ascending order.
//   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 }); // Initial pagination settings.
//   const [columnFilters, setColumnFilters] = useState([]); // Stores filters for specific columns.
//   const [globalFilter, setGlobalFilter] = useState(""); // Stores the global search filter.

//   // Configuration for the React Table instance.
//   const table = useReactTable({
//     data, // Data for the table.
//     columns, // Column definitions.
//     state: { sorting, pagination, columnFilters, globalFilter }, // Linking state to React Table.
//     onSortingChange: setSorting, // Function to handle sorting changes.
//     onPaginationChange: setPagination, // Function to handle pagination changes.
//     onColumnFiltersChange: setColumnFilters, // Function to handle column-specific filter changes.
//     onGlobalFilterChange: setGlobalFilter, // Function to handle global filter changes.
//     getCoreRowModel: getCoreRowModel(), // Core row model for basic table functionalities.
//     getSortedRowModel: getSortedRowModel(), // Model for sorting rows.
//     getFilteredRowModel: getFilteredRowModel(), // Model for filtering rows.
//     getPaginationRowModel: getPaginationRowModel(), // Model for pagination.
//     getRowId: (row) => row.id, // Function to get a unique row ID.
//     filterFns: {
//       globalText: (row, columnIds, filterValue) => {
//         // Custom filter function for global search.
//         if (!filterValue) return true; // Return all rows if no filter value.
//         return row.getAllCells().some((cell) => {
//           const cellValue = cell.getValue();
//           return String(cellValue)
//             .toLowerCase()
//             .includes(filterValue.toLowerCase()); // Check if any cell's value includes the filter value.
//         });
//       },
//     },
//     globalFilterFn: "globalText", // Setting the global filter function.
//   });

//   // Function to handle changes in the column filter for the 'name' column.
//   const handleColumnFilterChange = (e) => {
//     const { value } = e.target;
//     setColumnFilters([{ id: "name", value }]); // Update the filter state with the new value.
//   };

//   return (
//     <div className="overflow-x-auto p-4">
//       {/* Global Search Input */}
//       <div className="flex flex-row justify-between">
//         <div className="mb-4 flex gap-2 items-center w-1/2">
//           <label htmlFor="name">Global Search:</label>
//           <input
//             type="text"
//             value={globalFilter} // Global search value.
//             onChange={(e) => setGlobalFilter(e.target.value)} // Update global search state on change.
//             placeholder="Search across all columns..."
//             className="border border-gray-300 px-4 py-2 rounded-md w-1/2"
//           />
//         </div>

//         {/* Column-Specific Filter Input */}
//         <div className="mb-4 flex space-x-4">
//           <div key="name" className="flex items-center">
//             <label htmlFor="name" className="mr-2">
//               Search by Name:
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={columnFilters[0]?.value || ""} // Value for the 'name' column filter.
//               onChange={handleColumnFilterChange} // Update column filter state on change.
//               className="border border-gray-300 px-4 py-2 rounded-md"
//               placeholder="Filter by Name"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Sorting Dropdown */}
//       <div className="mb-4 flex justify-between">
//         <div>
//           <label htmlFor="sort-by-name" className="mr-2">
//             Sort by Name in:
//           </label>
//           <select
//             id="sort-by-name"
//             onChange={(e) => {
//               const value = e.target.value;
//               setSorting([{ id: "name", desc: value === "desc" }]); // Update sorting state based on the selected value.
//             }}
//             className="bg-white border border-gray-300 px-4 py-2 rounded-md"
//           >
//             <option value="asc">Ascending</option>
//             <option value="desc">Descending</option>
//           </select>
//         </div>
//       </div>

//       {/* Table Structure */}
//       <table className="min-w-full table-auto border-collapse border border-gray-200">
//         <thead className="bg-gray-100">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th
//                   key={header.id}
//                   className="px-6 py-3 text-left font-semibold text-gray-600 border-b border-gray-300"
//                 >
//                   {flexRender(
//                     header.column.columnDef.header,
//                     header.getContext()
//                   )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.length === 0 ? (
//             // Display message when no records match the filters.
//             <tr>
//               <td colSpan={columns.length} className="text-center py-4">
//                 No records found
//               </td>
//             </tr>
//           ) : (
//             // Display rows of the table.
//             table.getRowModel().rows.map((row) => (
//               <tr key={row.id} className="hover:bg-gray-50">
//                 {row.getVisibleCells().map((cell) => (
//                   <td
//                     key={cell.id}
//                     className="px-6 py-3 border-b border-gray-200 text-gray-600"
//                   >
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="flex justify-between items-center mt-4">
//         <div>
//           <button
//             onClick={() =>
//               setPagination({
//                 pageIndex: pagination.pageIndex - 1, // Navigate to the previous page.
//                 pageSize: pagination.pageSize,
//               })
//             }
//             disabled={pagination.pageIndex === 0} // Disable if on the first page.
//             className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="px-4">
//             Page {pagination.pageIndex + 1} of {table.getPageCount()}
//           </span>
//           <button
//             onClick={() =>
//               setPagination({
//                 pageIndex: pagination.pageIndex + 1, // Navigate to the next page.
//                 pageSize: pagination.pageSize,
//               })
//             }
//             disabled={pagination.pageIndex === table.getPageCount() - 1} // Disable if on the last page.
//             className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TableComponent;

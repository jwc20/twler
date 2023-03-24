import { useState, useEffect, useReducer } from "react";
import axios from "axios";

import { useTable } from "react-table"

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

function strikeThroughColumn(str) {
  return str.includes("<strike>") && str.includes("</strike>") ? (
    <strike>{str.replace("<strike>", "").replace("</strike>", "")}</strike>
  ) : (
    str
  );
}

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.group({
    id: "Info",
    header: () => <h1>Information</h1>,
    columns: [
      // Basic info
      columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("birthdate", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("nation", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("category", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("group", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
    ],
  }),

  columnHelper.group({
    id: "lifts",
    header: () => <h1>Competition Lifts</h1>,
    columns: [
      columnHelper.group({
        id: "sn",
        header: () => <h1>Snatch</h1>,
        columns: [
          // Snatch
          columnHelper.accessor("snatch1", {
            cell: (info) => strikeThroughColumn(info.getValue()),
            header: "sn1",
          }),
          columnHelper.accessor("snatch2", {
            cell: (info) => strikeThroughColumn(info.getValue()),
            header: "sn2",
          }),
          columnHelper.accessor("snatch3", {
            cell: (info) => strikeThroughColumn(info.getValue()),
            header: "sn3",
          }),
          columnHelper.accessor("snatch", {
            cell: (info) => strikeThroughColumn(info.getValue()),
          }),
          columnHelper.accessor("rank_sn", {
            cell: (info) => info.getValue(),
          }),
        ],
      }),
      columnHelper.group({
        id: "cj",
        header: () => <h1>Clean and Jerk</h1>,
        columns: [
          // Clean and Jerk
          columnHelper.accessor("jerk1", {
            cell: (info) => strikeThroughColumn(info.getValue()),
            header: "cj1",
            footer: (info) => info.column.id,
          }),
          columnHelper.accessor("jerk2", {
            cell: (info) => strikeThroughColumn(info.getValue()),
            header: "cj2",
          }),
          columnHelper.accessor("jerk3", {
            cell: (info) => strikeThroughColumn(info.getValue()),
            header: "cj3",
          }),
          columnHelper.accessor("jerk", {
            cell: (info) => strikeThroughColumn(info.getValue()),
          }),
          columnHelper.accessor("rank_cj", {
            cell: (info) => info.getValue(),
          }),
        ],
      }),
    ],
  }),

  // Total
  columnHelper.accessor("total", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("rank", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

function ResultTable({ name, cid }) {
  const [result, setResult] = useState([]);
  const [eventInfo, setEventInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);

  // tanstack table
  const rerender = useReducer(() => ({}), {})[1];

  const groupedByCategoryData = data.reduce((groups, item) => {
    const category = item.category;
    groups[category] = groups[category] || [];
    groups[category].push(item);
    return groups;
  }, {});



  useEffect(() => {
    let timer;
    const getResult = async () => {
      try {
        timer = setTimeout(() => {
          // console.log(url);
          axios.get(url).then((response) => {
            setResult(response.data);
            setData([...response.data]);
            setIsLoading(false);
          });
          // console.log(response.data);
          // console.log(typeof response.data)
        }, 5000);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      }
    };
    if (cid) {
      getResult();
    }
  }, [url]);

  useEffect(() => {
    const builtUrl = `http://localhost:8000/api/ipfs/${cid}`;
    // console.log(builtUrl);
    setUrl(builtUrl);
  }, [cid]);

  // console.log(groupedByCategoryData);

  // for (const key in groupedByCategoryData) {
  //   if (Object.hasOwnProperty.call(groupedByCategoryData, key)) {
  //     const categoryData = groupedByCategoryData[key];
  //     // console.log(`category: ${key}: ${categoryData.length} objects`);
  //     // console.log(categoryData);
  //   }
  // }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  

  console.log(Object.keys(groupedByCategoryData));

  return (
    <div className="my-10">
      {Object.keys(groupedByCategoryData).map((category) => (
        <div key={category}>
          <h3>Category {category}</h3>

          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default ResultTable;

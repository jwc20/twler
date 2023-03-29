import { useState } from "react";

import cx from "classnames";

function strikeThroughColumn(str) {
  return str.includes("<strike>") && str.includes("</strike>") ? (
    <strike>{str.replace("<strike>", "").replace("</strike>", "")}</strike>
  ) : (
    str
  );
}
function ResultTable({ data }) {
  const [sortType, setSortType] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);

  const handleSort = (column) => {
    setSortType((prevSortType) => (prevSortType === "asc" ? "desc" : "asc"));
    setSortColumn(column);
  };

  const sortedData = [...data].sort((a, b) => {
    const aRank = a[sortColumn] === "---" ? Infinity : Number(a[sortColumn]);
    const bRank = b[sortColumn] === "---" ? Infinity : Number(b[sortColumn]);

    if (sortColumn === "rank") {
      // return sortType === "asc" ? a.rank - b.rank : b.rank - a.rank;
      return sortType === "asc" ? aRank - bRank : bRank - aRank;
    } else if (sortColumn === "rank_cj") {
      return sortType === "asc" ? aRank - bRank : bRank - aRank;
    } else if (sortColumn === "rank_sn") {
      return sortType === "asc" ? aRank - bRank : bRank - aRank;
    } else if (sortColumn === "bodyweight") {
      return sortType === "asc"
        ? a.bodyweight - b.bodyweight
        : b.bodyweight - a.bodyweight;
    } else if (sortColumn === "birthdate") {
      const aDate = new Date(a.birthdate.replace(/,/g, ""));
      const bDate = new Date(b.birthdate.replace(/,/g, ""));
      return sortType === "asc" ? aDate - bDate : bDate - aDate;
    } else if (sortColumn === "name") {
      return sortType === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortColumn === "last_name") {
      return sortType === "asc"
        ? a.last_name.localeCompare(b.last_name)
        : b.last_name.localeCompare(a.last_name);
    } else if (sortColumn === "first_name") {
      return sortType === "asc"
        ? a.first_name.localeCompare(b.first_name)
        : b.first_name.localeCompare(a.first_name);
    } else if (sortColumn === "group") {
      return sortType === "asc"
        ? a.group.localeCompare(b.group)
        : b.group.localeCompare(a.group);
    } else if (sortColumn === "nation") {
      return sortType === "asc"
        ? a.nation.localeCompare(b.nation)
        : b.nation.localeCompare(a.nation);
    }

    return 0;
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan="5">Information</th>
            <th colSpan="12">Competition Lifts</th>
          </tr>
          <tr>
            <th colSpan="5"></th>
            <th colSpan="5">Snatch</th>
            <th colSpan="5">Clean and Jerk</th>
            <th colSpan="2">Total</th>
          </tr>
          <tr>
            {/* <th className="bg-indigo-50" onClick={() => handleSort("name")}> */}
            {/*   name {sortColumn === "name" && sortType === "asc" ? "" : ""} */}
            {/* </th> */}
            <th
              className="bg-indigo-50"
              onClick={() => handleSort("last_name")}
            >
              last_name{" "}
              {sortColumn === "last_name" && sortType === "asc" ? "" : ""}
            </th>
            <th
              className="bg-indigo-50"
              onClick={() => handleSort("first_name")}
            >
              first_name{" "}
              {sortColumn === "first_name" && sortType === "asc" ? "" : ""}
            </th>
            <th className="bg-indigo-50" onClick={() => handleSort("nation")}>
              nation {sortColumn === "nation" && sortType === "asc" ? "" : ""}
            </th>
            <th
              className="bg-indigo-50"
              onClick={() => handleSort("birthdate")}
            >
              birthdate{" "}
              {sortColumn === "birthdate" && sortType === "asc" ? "" : ""}
            </th>
            <th
              className="bg-indigo-50"
              onClick={() => handleSort("bodyweight")}
            >
              bodyweight{" "}
              {sortColumn === "bodyweight" && sortType === "asc" ? "" : ""}
            </th>
            <th className="bg-indigo-50" onClick={() => handleSort("group")}>
              group {sortColumn === "group" && sortType === "asc" ? "" : ""}
            </th>

            <th>sn_1</th>
            <th>sn_2</th>
            <th>sn_3</th>
            <th>sn</th>
            <th className="bg-indigo-50" onClick={() => handleSort("rank_sn")}>
              rank_sn {sortColumn === "rank_sn" && sortType === "asc" ? "" : ""}
            </th>

            <th>cj_1</th>
            <th>cj_2</th>
            <th>cj_3</th>
            <th>cj</th>
            <th className="bg-indigo-50" onClick={() => handleSort("rank_cj")}>
              rank_cj {sortColumn === "rank_cj" && sortType === "asc" ? "" : ""}
            </th>

            <th>total</th>
            <th className="bg-indigo-50" onClick={() => handleSort("rank")}>
              rank {sortColumn === "rank" && sortType === "asc" ? "" : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr
              key={index}
              className={index % 2 == 0 ? "bg-white" : "bg-gray-100"}
            >
              {/* <td>{item.name}</td> */}
              <td className="pr-5">{item.last_name}</td>
              <td className="pr-5">{item.first_name}</td>
              <td className="text-center">{item.nation}</td>
              <td className="text-center px-5">{item.birthdate}</td>
              <td className="text-center">{item.bodyweight}</td>
              <td className="text-center">{item.group}</td>
              <td className="text-center">
                {strikeThroughColumn(item.snatch1)}
              </td>
              <td className="text-center">
                {strikeThroughColumn(item.snatch2)}
              </td>
              <td className="text-center">
                {strikeThroughColumn(item.snatch3)}
              </td>
              <td
                className={cx(
                  item.rank_sn === "1" ? "bg-yellow-300" : "",
                  item.rank_sn === "2" ? "bg-gray-300" : "",
                  item.rank_sn === "3" ? "bg-yellow-600" : "",
                  "text-center"
                )}
              >
                {item.snatch}
              </td>
              <td
                className={cx(
                  item.rank_sn === "1" ? "bg-yellow-300" : "",
                  item.rank_sn === "2" ? "bg-gray-300" : "",
                  item.rank_sn === "3" ? "bg-yellow-600" : "",
                  "text-center"
                )}
              >
                {item.rank_sn}
              </td>

              <td className="text-center">{strikeThroughColumn(item.jerk1)}</td>
              <td className="text-center">{strikeThroughColumn(item.jerk2)}</td>
              <td className="text-center">{strikeThroughColumn(item.jerk3)}</td>
              <td
                className={cx(
                  item.rank_cj === "1" ? "bg-yellow-300" : "",
                  item.rank_cj === "2" ? "bg-gray-300" : "",
                  item.rank_cj === "3" ? "bg-yellow-600" : "",
                  "text-center"
                )}
              >
                {item.jerk}
              </td>
              <td
                className={cx(
                  item.rank_cj === "1" ? "bg-yellow-300" : "",
                  item.rank_cj === "2" ? "bg-gray-300" : "",
                  item.rank_cj === "3" ? "bg-yellow-600" : "",
                  "text-center"
                )}
              >
                {item.rank_cj}
              </td>

              <td
                className={cx(
                  item.rank === "1" ? "bg-yellow-300" : "",
                  item.rank === "2" ? "bg-gray-300" : "",
                  item.rank === "3" ? "bg-yellow-600" : "",
                  "text-center"
                )}
              >
                {item.total}
              </td>

              <td
                className={cx(
                  item.rank === "1" ? "bg-yellow-300" : "",
                  item.rank === "2" ? "bg-gray-300" : "",
                  item.rank === "3" ? "bg-yellow-600" : "",
                  "text-center"
                )}
              >
                {item.rank}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            {/* <th>name</th> */}

            <th>last_name</th>
            <th>first_name</th>
            <th>nation</th>
            <th>birthdate</th>
            <th>bodyweight</th>
            <th>group</th>

            <th>sn_1</th>
            <th>sn_2</th>
            <th>sn_3</th>
            <th>sn</th>
            <th>rank_sn</th>

            <th>cj_1</th>
            <th>cj_2</th>
            <th>cj_3</th>
            <th>cj</th>
            <th>rank_cj</th>

            <th>total</th>
            <th>rank</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ResultTable;

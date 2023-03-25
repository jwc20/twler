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
    if (sortColumn === "rank") {
      return sortType === "asc" ? a.rank - b.rank : b.rank - a.rank;
    } else if (sortColumn === "rank_cj") {
      return sortType === "asc" ? a.rank_cj - b.rank_cj : b.rank_cj - a.rank_cj;
    } else if (sortColumn === "rank_sn") {
      return sortType === "asc" ? a.rank_sn - b.rank_sn : b.rank_sn - a.rank_sn;
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
            {/* <th>name</th> */}
            <th onClick={() => handleSort("name")}>
              name {sortColumn === "name" && sortType === "asc" ? "" : ""}
            </th>
            <th>nation</th>
            {/* <th>birthdate</th> */}
            <th onClick={() => handleSort("birthdate")}>
              birthdate{" "}
              {sortColumn === "birthdate" && sortType === "asc" ? "" : ""}
            </th>
            {/* <th>bodyweight</th> */}
            <th onClick={() => handleSort("bodyweight")}>
              bodyweight{" "}
              {sortColumn === "bodyweight" && sortType === "asc" ? "" : ""}
            </th>
            <th>group</th>

            <th>snatch1</th>
            <th>snatch2</th>
            <th>snatch3</th>
            <th>snatch</th>
            {/* <th>rank_sn</th> */}
            <th onClick={() => handleSort("rank_sn")}>
              rank_sn{" "}
              {sortColumn === "rank_sn" && sortType === "asc" ? "" : ""}
            </th>

            <th>jerk1</th>
            <th>jerk2</th>
            <th>jerk3</th>
            <th>jerk</th>
            {/* <th>rank_cj</th> */}
            <th onClick={() => handleSort("rank_cj")}>
              rank_cj{" "}
              {sortColumn === "rank_cj" && sortType === "asc" ? "" : ""}
            </th>

            <th>total</th>
            <th onClick={() => handleSort("rank")}>
              rank {sortColumn === "rank" && sortType === "asc" ? "" : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.nation}</td>
              <td>{item.birthdate}</td>
              <td>{item.bodyweight}</td>
              <td>{item.group}</td>
              {/* <td>{item.gender}</td> */}

              <td>{strikeThroughColumn(item.snatch1)}</td>
              <td>{strikeThroughColumn(item.snatch2)}</td>
              <td>{strikeThroughColumn(item.snatch3)}</td>
              <td
                className={cx(
                  item.rank_sn === "1" ? "bg-yellow-300" : "",
                  item.rank_sn === "2" ? "bg-gray-300" : "",
                  item.rank_sn === "3" ? "bg-yellow-600" : ""
                )}
              >
                {item.snatch}
              </td>
              <td
                className={cx(
                  item.rank_sn === "1" ? "bg-yellow-300" : "",
                  item.rank_sn === "2" ? "bg-gray-300" : "",
                  item.rank_sn === "3" ? "bg-yellow-600" : ""
                )}
              >
                {item.rank_sn}
              </td>

              <td>{strikeThroughColumn(item.jerk1)}</td>
              <td>{strikeThroughColumn(item.jerk2)}</td>
              <td>{strikeThroughColumn(item.jerk3)}</td>
              <td
                className={cx(
                  item.rank_cj === "1" ? "bg-yellow-300" : "",
                  item.rank_cj === "2" ? "bg-gray-300" : "",
                  item.rank_cj === "3" ? "bg-yellow-600" : ""
                )}
              >
                {item.jerk}
              </td>
              <td
                className={cx(
                  item.rank_cj === "1" ? "bg-yellow-300" : "",
                  item.rank_cj === "2" ? "bg-gray-300" : "",
                  item.rank_cj === "3" ? "bg-yellow-600" : ""
                )}
              >
                {item.rank_cj}
              </td>

              <td
                className={cx(
                  item.rank === "1" ? "bg-yellow-300" : "",
                  item.rank === "2" ? "bg-gray-300" : "",
                  item.rank === "3" ? "bg-yellow-600" : ""
                )}
              >
                {item.total}
              </td>

              <td
                className={cx(
                  item.rank === "1" ? "bg-yellow-300" : "",
                  item.rank === "2" ? "bg-gray-300" : "",
                  item.rank === "3" ? "bg-yellow-600" : ""
                )}
              >
                {item.rank}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>name</th>
            <th>nation</th>
            <th>birthdate</th>
            <th>bodyweight</th>
            <th>group</th>

            <th>snatch1</th>
            <th>snatch2</th>
            <th>snatch3</th>
            <th>snatch</th>
            <th>rank_sn</th>

            <th>jerk1</th>
            <th>jerk2</th>
            <th>jerk3</th>
            <th>jerk</th>
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

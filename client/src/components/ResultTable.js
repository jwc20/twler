import { useState, useEffect, useReducer } from "react";
import axios from "axios";

import { useTable } from "react-table";
import cx from "classnames";

function strikeThroughColumn(str) {
  return str.includes("<strike>") && str.includes("</strike>") ? (
    <strike>{str.replace("<strike>", "").replace("</strike>", "")}</strike>
  ) : (
    str
  );
}

function ResultTable({ name, cid }) {
  const [result, setResult] = useState([]);
  const [eventInfo, setEventInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);

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
          axios.get(url).then((response) => {
            setResult(response.data);
            setData([...response.data]);
            setIsLoading(false);
          });
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

  return (
    <div className="my-10">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        Object.keys(groupedByCategoryData).map((category) => (
          <div className="pb-5" key={category}>
            {["Women", "Men"].map((gender) => {
              const filteredData = groupedByCategoryData[category].filter(
                (item) => item.gender === gender
              );
              if (filteredData.length > 0) {
                return (
                  <div key={gender}>
                    <b>
                      <h3>
                        {category} - {gender}
                      </h3>
                    </b>
                    <Table data={filteredData} />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        ))
      )}
    </div>
  );
}

function Table({ data }) {
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
        </thead>
        <tbody>
          {data.map((item, index) => (
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

              <td>{item.rank_sn}</td>

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

              <td>{item.rank_cj}</td>

              <td
                className={cx(
                  item.rank === "1" ? "bg-yellow-300" : "",
                  item.rank === "2" ? "bg-gray-300" : "",
                  item.rank === "3" ? "bg-yellow-600" : ""
                )}
              >
                {item.total}
              </td>
              <td>{item.rank}</td>
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

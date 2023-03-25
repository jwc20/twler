import { useState, useEffect, useReducer } from "react";
import axios from "axios";

import ResultTable from "./ResultTable.js";

function ResultTableContainer({ name, cid }) {
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
    setUrl(builtUrl);
  }, [cid]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        Object.keys(groupedByCategoryData).map((category) => (
          <div className="py-5" key={category}>
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
                    <ResultTable data={filteredData} />
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

export default ResultTableContainer;

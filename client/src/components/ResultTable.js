import { useState, useEffect } from "react";
// import * as IPFS from "ipfs-core";
import axios from "axios";

function ResultTable({ cid }) {
  const [result, setResult] = useState([]);
  const [eventInfo, setEventInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const url = "http://localhost:8000/api/example-ipfs-json/";

  useEffect(() => {
    const getResult = async () => {
      try {
        const response = await axios.get(url);
        setIsLoading(false);
        // console.log(response.data);
        // console.log(typeof response.data)
        setResult(response.data);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      }
    };
    getResult();
  }, []);

  console.log(result);

  return (
    <div className="result-table">
      <p>This is the result table</p>
      <p>{cid}</p>
      {result &&
        result.map((item, index) => (
          <div key={item.id}>
            <li>
              {item.name} {item.snatch} {item.jerk} {item.rank}
            </li>
          </div>
        ))}
    </div>
  );
}

export default ResultTable;

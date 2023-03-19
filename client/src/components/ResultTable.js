





import { useState, useEffect } from "react";
// import * as IPFS from "ipfs-core";
import axios from "axios";


function ResultTable({ cid }) {
  const [result, setResult] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const url = "http://localhost:8000/api/example-ipfs-json/";

  useEffect(() => {
    const getEventInfo = async () => {
      try {
        const response = await axios.get(url);
        console.log(response)
        setIsLoading(false);
        setEventInfo(response.data);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      }
    };
    getEventInfo();
  }, []);

  return (
    <div className="result-table">
      <p>THIS IS S ASD ASDKJASLJKDHOAIWURDIJAF RESULT TABLE</p>
      <p>{cid}</p>
    </div>
  );
}

export default ResultTable;

import { useState, useEffect } from "react";
// import * as IPFS from "ipfs-core";
import axios from "axios";

import ResultTable from "../components/ResultTable";

function ResultPage() {
  const [result, setResult] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const url = "http://localhost:8000/api/events/1";

  useEffect(() => {
    const getEventInfo = async () => {
      try {
        const response = await axios.get(url);
        setIsLoading(false);
        setEventInfo(response.data);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      }
    };
    getEventInfo();
    // const getResult = async () => {
    //   const ipfs = await IPFS.create();
    //   console.log(eventInfo.cid);
    //   const result_json_data = await ipfs.dag.get(eventInfo.cid);
    //   setResult(result_json_data);
    // };
    // getResult();
  }, []);

  return (
    <div className="ResultPage">
      <div>
        <p>Test</p>
        <li>{eventInfo.name}</li>
        <li>{eventInfo.location}</li>
        <li>{eventInfo.date}</li>
        <li>{eventInfo.event_url}</li>
        <li>{eventInfo.cid}</li>

        <br />

        <ResultTable cid={ eventInfo.cid }/>

      </div>
    </div>
  );
}

export default ResultPage;

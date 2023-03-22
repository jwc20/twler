import { useState, useEffect } from "react";
// import * as IPFS from "ipfs-core";
import axios from "axios";
import { useParams, useNavigate, generatePath } from "react-router-dom";

import ResultTable from "../components/ResultTable";

function ResultPage() {
  const [result, setResult] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const url = `http://localhost:8000/api/events/${id}`;
  console.log(url);


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
  }, []);



  return (
    <div className="result-page">
      {id}
      <p>Test</p>
      <li>{eventInfo.name}</li>
      <li>{eventInfo.location}</li>
      <li>{eventInfo.date}</li>
      <li>{eventInfo.event_url}</li>
      <li>{eventInfo.cid}</li>

      <br />
      <hr className="dashed"></hr>

      <ResultTable cid={eventInfo.cid} name={eventInfo.name} />
    </div>
  );
}

export default ResultPage;

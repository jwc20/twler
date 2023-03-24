import { useState, useEffect } from "react";
// import * as IPFS from "ipfs-core";
import axios from "axios";
import { useParams, useNavigate, generatePath } from "react-router-dom";

import ResultTable from "../components/ResultTable";
import EventInfoTable from "../components/EventInfoTable.js";

function ResultPage() {
  const [result, setResult] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const url = `http://localhost:8000/api/events/${id}`;

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
    <div className="m-10">
      <div className="flex justify-center items-center">
        <EventInfoTable className="mx-auto" eventInfo={eventInfo} />
      </div>

      <br />

      <hr className="dashed"></hr>

      <div className="flex justify-center items-center">
        <ResultTable
          className="mx-auto"
          cid={eventInfo.cid}
          name={eventInfo.name}
        />
      </div>
    </div>
  );
}

export default ResultPage;

import { useState, useEffect } from "react";
import axios from "axios";

function ResultTable({ name, cid }) {
  const [result, setResult] = useState([]);
  const [eventInfo, setEventInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const url = "http://localhost:8000/api/example-ipfs-json/";
  // const url = "http://localhost:8000/api/ipfs/" + cid + "/";

  const [url, setUrl] = useState("");

  useEffect(() => {
    let timer;
    const getResult = async () => {
      try {
        timer = setTimeout(() => {
          console.log(url);
          axios.get(url).then((response) => {
            setResult(response.data);
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
    console.log(builtUrl)
    setUrl(builtUrl);
  }, [cid]);


  return (
    <div className="result-table">
      <h2>{name}</h2>
      <p>{cid}</p>
      {result &&
        result.map((item, index) => (
          // The items need a key that is not the name.
          <div key={item.name}>
            <li>
              {item.name} {item.snatch} {item.jerk} {item.rank}
            </li>
          </div>
        ))}
    </div>
  );
}

export default ResultTable;

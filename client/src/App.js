import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const url = "http://127.0.0.1:8000/api/events/";
  const url = "http://localhost:8000/api/events/"

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const response = await axios.get(url);
        setIsLoading(false);
        const allEvents = response.data;
        console.log(allEvents);
        setEvents(allEvents);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      }
    };

    getAllEvents();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {events &&
        events.map((item, index) => (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <p>{item.location}</p>
            <p>{item.date}</p>
            <p>{item.event_url}</p>
          </div>
        ))}
      {isError && <div>Error fetching data.</div>}
    </div>
  );
}

export default App;

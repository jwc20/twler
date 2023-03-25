import { useState, useEffect } from "react";
import axios from "axios";

import EventTable from "../components/EventTable";

function EventPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const url = "http://localhost:8000/api/events/";

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const response = await axios.get(url);
        setIsLoading(false);
        const allEvents = response.data;
        // console.log(allEvents);
        setEvents(allEvents);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      }
    };

    getAllEvents();
  }, []);

  return (
    <div className="flex flex-col items-center my-10">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="text-3xl font-bold">Events</h1>
          <EventTable events={events} isError={isError} />
        </>
      )}
    </div>
  );
}

export default EventPage;

function EventTable({ events, isError }) {
  return (
    <div className="event-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Event URL</th>
            <th>CID</th>
          </tr>
        </thead>
        <tbody>
          {events &&
            events.map((item, index) => (
              <tr key={item.id}>
                <td>{events.length - index}</td>
                <td>
                  <a
                    href={`http://localhost:3000/result/${item.id}`}
                    className="text-blue-600 hover:text-blue-500 focus:text-purple-600 visited:text-purple-800"
                  >
                    {item.name}
                  </a>
                </td>
                <td>{item.location}</td>
                <td>{item.date}</td>
                <td>{item.event_url}</td>
                <td>{item.cid}</td>
              </tr>
            ))}
          {isError && <div>Error fetching data.</div>}
        </tbody>
      </table>
    </div>
  );
}

export default EventTable;

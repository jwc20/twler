function EventTable({ events, isError }) {
  return (
    <div className="event-table">
      <table>
        <thead>
          <tr>
            <th className="px-4">#</th>
            <th className="px-10">Date</th>
            <th>Location</th>
            <th>Name</th>

            {/* <th>Event URL</th> */}
            {/* <th>CID</th> */}
          </tr>
        </thead>
        <tbody>
          {events &&
            events.map((item, index) => (
              <tr
                key={item.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
              >
                <td className="text-center">{events.length - index}</td>
                <td className="text-center">{item.date}</td>
                <td className="text-center">{item.location}</td>
                <td>
                  <a
                    href={`http://localhost:3000/result/${item.id}`}
                    className="text-blue-600 hover:text-blue-500 focus:text-purple-600 visited:text-purple-800"
                  >
                    {item.name}
                  </a>
                </td>

                {/* <td>{item.event_url}</td> */}
                {/* <td>{item.cid}</td> */}
              </tr>
            ))}
          {isError && <div>Error fetching data.</div>}
        </tbody>
      </table>
    </div>
  );
}

export default EventTable;

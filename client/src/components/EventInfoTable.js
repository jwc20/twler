import { useState, useEffect } from "react";

function EventInfoTable({ eventInfo }) {
  // Error Ignore: Warning: validateDOMNesting(...): Text nodes cannot appear as a child of <tr>.

  return (
    <div>
      <table className="table-fixed">
        <thead className="border-b border-light-gray text-center">
          <tr className="font-bold">{eventInfo.name}</tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Date</strong>: {eventInfo.date}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Location</strong>: {eventInfo.location}
            </td>
          </tr>
          <tr>
            <td>
              <strong>URL</strong>: {eventInfo.event_url}
            </td>
          </tr>
          <tr>
            <td>
              <strong>CID</strong>: {eventInfo.cid}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EventInfoTable;

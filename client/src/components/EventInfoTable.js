import { useState, useEffect } from "react";

function EventInfoTable({ eventInfo }) {
  return (
    <div>
      <table className="table-fixed">
        <thead className="border-b border-light-gray text-center">
          {/* <tr className="font-bold">{eventInfo.name}</tr> */}
          <tr>
            <td>
              <span className="font-bold">{eventInfo.name}</span>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="font-bold">Date:</span> {eventInfo.date}
            </td>
          </tr>
          <tr>
            <td>
              <span className="font-bold">Location:</span> {eventInfo.location}
            </td>
          </tr>
          <tr>
            <td>
              <span className="font-bold">URL:</span>
              <a
                href={eventInfo.event_url}
                className="text-blue-600 hover:text-blue-500 focus:text-purple-600 visited:text-purple-800"
              >
                {" "}
                {eventInfo.event_url}
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <span className="font-bold">CID:</span>
              <a
                href={"https://ipfs.io/ipfs/" + eventInfo.cid + "/"}
                className="text-blue-600 hover:text-blue-500 focus:text-purple-600 visited:text-purple-800"
              >
                {" "}
                {eventInfo.cid}
              </a>
              {/* https://ipfs.io/ipfs/QmVGGsGDtWv9Cm5q5zo3R39d8roZj52pPdWyyof8n5Z6PP/ */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EventInfoTable;

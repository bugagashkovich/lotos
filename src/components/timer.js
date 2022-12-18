import { DateTime } from "luxon";
import { client } from "../utils/apolloClient";
import { useState, useEffect } from "react";
import { gql } from "@apollo/client";

const GET_SESSION = gql`
  query Session {
    session {
      users {
        id
        name
      }
      activeUserIndex
      nextTimeStep
    }
  }
`;

export default function Timer({ timeStamp, users, activeUser }) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let timeEnd = DateTime.fromMillis(timeStamp);
      let { minutes, seconds } = timeEnd.diff(DateTime.local(), [
        "minutes",
        "seconds",
      ]);
      setSeconds(seconds.toFixed(0));
      setMinutes(minutes);
      if (seconds < 0) {
        setSeconds(0);
        setMinutes(0);
        client.refetchQueries({
          include: [GET_SESSION],
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeStamp]);

  const timerList = users.map((user) => {
    if (users.indexOf(user) === activeUser) {
      return (
        <td style={{ width: "calc(100%/6)" }}>
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </td>
      );
    } else {
      return <td> &nbsp;</td>;
    }
  });

  return (
    <div className="container">
      <table className="table table-borderless">
        <tbody className="text-center">
          <tr>
            <td style={{ width: "calc(100%/6)" }}>&nbsp; </td>
            {timerList}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

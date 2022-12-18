import "bootstrap/dist/css/bootstrap.css";

import { useQuery, gql } from "@apollo/client";

import Table from "./components/table";
import Timer from "./components/timer";

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

function App() {
  const { loading, error, data } = useQuery(GET_SESSION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className="App">
      <Timer
        timeStamp={data.session.nextTimeStep}
        users={data.session.users}
        activeUser={data.session.activeUserIndex}
      />
      <Table users={data.session.users} />
    </div>
  );
}

export default App;

export default function Table({ users }) {
  const requirements = [
    { id: 1, name: "Требование 1" },
    { id: 2, name: "Требование 2" },
    { id: 3, name: "Требование 3" },
  ];

  const userList = users
    ? users.map((user) => {
        return (
          <th scope="col" key={user.id} className="text-center">
            {user.name}
          </th>
        );
      })
    : null;

  const userOffer = users
    ? users.map((user) => {
        return (
          <td key={user.id} className="text-center">
            Предложение
          </td>
        );
      })
    : null;
  const requirementsList = requirements.map((requirement) => {
    return (
      <tr key={requirement.id}>
        <th scope="row">{requirement.name}</th>
        {userOffer}
      </tr>
    );
  });
  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Требования</th>
            {userList}
          </tr>
        </thead>
        <tbody>{requirementsList}</tbody>
      </table>
    </div>
  );
}

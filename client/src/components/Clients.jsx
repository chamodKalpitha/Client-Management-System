import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong!</p>;

  const tableRowElement = data.getClients.map((client) => (
    <ClientRow key={client.id} client={client} />
  ));

  return (
    <>
      {!loading && !error && (
        <table class="table-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{tableRowElement}</tbody>
        </table>
      )}
    </>
  );
}

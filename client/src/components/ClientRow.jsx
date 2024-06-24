import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries: [{ query: GET_CLIENTS }], Not recomened it slow down the app
    update(cache, { data: { deleteClient } }) {
      const { getClients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          getClients: getClients.filter(
            (client) => client.id !== deleteClient.id
          ),
        },
      });
    },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          className="flex bg-red-500 px-3 py-2 text-white gap-2 rounded-md"
          onClick={deleteClient}
        >
          <span class="material-symbols-rounded">delete</span>
          <p className=" font-semibold">Delete</p>
        </button>
      </td>
    </tr>
  );
}

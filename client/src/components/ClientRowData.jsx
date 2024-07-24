import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function ClientTableRow({ index, client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update(cache, { data: { deleteClient } }) {
      const { getClients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          getClients: {
            ...getClients,
            edges: getClients.edges.filter(
              (client) => client.id !== deleteClient.id
            ),
            pageInfo: getClients.pageInfo,
          },
        },
      });
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteClient({
          variables: {
            id: client.id,
          },
        })
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: `${error.message}`,
              icon: "error",
              showConfirmButton: true,
            });
          });
      }
    });
  };

  return (
    <tr key={index}>
      <td className="px-4 py-2 font-medium text-gray-900 text-center">
        {index + 1}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {client.name}
      </td>
      <td className="px-4 py-2 text-gray-700 text-center">{client.email}</td>
      <td className="px-4 py-2 text-gray-700 text-center">
        {client.mobileNumber}
      </td>
      <td className="px-4 py-2 text-gray-700 text-center">{client.address}</td>
      <td className="whitespace-nowrap px-4 py-2 flex justify-center gap-1">
        <Link
          to={`/dashboard/clients/${client.id}/view`}
          className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
        >
          View
        </Link>
        <Link
          to={`/dashboard/clients/${client.id}/edit`}
          href="#"
          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
        >
          Edit
        </Link>
        <button
          className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

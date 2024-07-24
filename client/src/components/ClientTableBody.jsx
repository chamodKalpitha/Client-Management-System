import React from "react";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import Swal from "sweetalert2";

export default function ClientTableBody({ data }) {
  const hasData = data.length > 0;

  const deletefunction = (id) => {
    deleteClient;
  };

  return (
    <tbody className="divide-y divide-gray-200">
      {hasData &&
        data.map((client, index) => {
          return (
            <tr key={index}>
              <td className=" px-4 py-2 font-medium text-gray-900 text-center">
                {index + 1}
              </td>
              <td className="whitespace-nowrap  px-4 py-2 font-medium text-gray-900 text-center">
                {client.name}
              </td>
              <td className="px-4 py-2 text-gray-700 text-center">
                {client.email}
              </td>
              <td className="px-4 py-2 text-gray-700 text-center">
                {client.mobileNumber}
              </td>
              <td className="px-4 py-2 text-gray-700 text-center">
                {client.address}
              </td>
              <td
                className="whitespace-nowrap px-4 py-2 flex justify-center gap-1  
        "
              >
                <a
                  href="#"
                  className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
                >
                  View
                </a>
                <a
                  href="#"
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  Edit
                </a>
                <button
                  className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                  onClick={() => {
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
                        deletefunction(client.id);
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your file has been deleted.",
                          icon: "success",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                      }
                    });
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}

      {!hasData && (
        <tr>
          <td colspan="6" className=" text-center">
            No Data
          </td>
        </tr>
      )}
    </tbody>
  );
}

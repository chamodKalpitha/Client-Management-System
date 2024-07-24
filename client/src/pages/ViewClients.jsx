import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CLIENT_BY_ID } from "../queries/clientQueries";

export default function ViewClients() {
  const { clientId } = useParams();
  const { loading, error, data } = useQuery(GET_CLIENT_BY_ID, {
    variables: {
      id: clientId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const client = data.getClientById;
  console.log(typeof client.lastModifiedDate);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-bold text-gray-900">View Client Details</p>
      </div>
      <div className="flex justify-center">
        <div className="w-1/2 flex-col">
          <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Name</dt>
                <dd className="text-gray-700 sm:col-span-2">{client.name}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Email</dt>
                <dd className="text-gray-700 sm:col-span-2">{client.email}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Mobile Number</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {client.mobileNumber}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Has WhatsApp</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {client.hasWhatsapp ? "Yes" : "No"}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Address</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {client.address}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Created By</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {client.createdBy}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Registered Date</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {new Date(client.registedDate).toLocaleString()}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Last Modified By</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {client.lastModifiedBy}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">
                  Last Modified Date
                </dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {new Date(client.lastModifiedDate).toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

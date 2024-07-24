import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ADD_CLIENT, EDIT_CLIENT } from "../mutations/clientMutations";
import ErrorAlert from "../components/ErrorAlert";
import { useMutation, useApolloClient } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import Swal from "sweetalert2";

export default function EditClients() {
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const { clientId } = useParams();

  // client State
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    hasWhatsapp: false,
    address: "",
  });

  // Error State
  const [errorList, setErrorList] = useState([]);

  // Set data to the fields if clientId is there
  useEffect(() => {
    if (clientId) {
      const {
        getClients: { edges },
      } = apolloClient.readQuery({ query: GET_CLIENTS });
      const editClient = edges.find((client) => client.id === clientId);
      if (editClient) {
        setClientData(editClient);
      }
    }
  }, [clientId]);

  // Add Client Mutation
  const [addClient] = useMutation(ADD_CLIENT, {
    update(cache, { data: { addClients } }) {
      const { getClients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          getClients: {
            ...getClients,
            edges: [...getClients.edges, addClients],
          },
        },
      });
    },
  });

  // Edit Client Mutation
  const [editClient] = useMutation(EDIT_CLIENT, {
    update(cache, { data: { editClients } }) {
      const { getClients } = cache.readQuery({ query: GET_CLIENTS });

      const updatedClients = getClients.edges.map((client) =>
        client.id === clientId ? editClients : client
      );
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          getClients: {
            ...getClients,
            edges: updatedClients,
          },
        },
      });
    },
  });

  const handleAddClient = (e) => {
    e.preventDefault();
    addClient({
      variables: clientData,
    })
      .then(() => {
        Swal.fire({
          title: "Successfully Created!",
          text: "New client created",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setClientData({
          name: "",
          email: "",
          mobileNumber: "",
          hasWhatsapp: false,
          address: "",
        });
        navigate("/dashboard/clients");
      })
      .catch((error) => {
        setErrorList(JSON.parse(error.message).messages);
      });
  };

  const handleEditClient = (e) => {
    e.preventDefault();
    editClient({
      variables: { id: clientId, ...clientData },
    })
      .then(() => {
        Swal.fire({
          title: "Successfully Updated!",
          text: "Client details updated",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/clients");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorList(JSON.parse(error.message).messages);
      });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-bold text-gray-900">
          {clientId ? "Edit Client" : "Add new client"}
        </p>
      </div>
      <div className="flex justify-center">
        <div className="w-1/2 flex-col">
          {errorList.length > 0 && <ErrorAlert errorList={errorList} />}

          <form onSubmit={clientId ? handleEditClient : handleAddClient}>
            <div>
              <label
                htmlFor="name"
                className="block font-medium text-sm mt-6 text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your full name"
                value={clientData.name}
                className="block w-full p-2 mt-1 border rounded-lg mb-4 placeholder:font-light placeholder:text-sm"
                onChange={(e) => {
                  setClientData((currentState) => ({
                    ...currentState,
                    name: e.target.value,
                  }));
                }}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-sm text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                value={clientData.email}
                className="block w-full p-2 mt-1 border rounded-lg mb-4 placeholder:font-light placeholder:text-sm"
                onChange={(e) => {
                  setClientData((currentState) => ({
                    ...currentState,
                    email: e.target.value,
                  }));
                }}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block font-medium text-sm text-gray-700"
                >
                  Mobile no
                </label>
                <input
                  type="number"
                  name="mobileNumber"
                  id="mobileNumber"
                  placeholder="Enter Your Mobile Number"
                  value={clientData.mobileNumber}
                  className="block w-full p-2 mt-1 border rounded-lg mb-4 placeholder:font-light placeholder:text-sm"
                  onChange={(e) => {
                    setClientData((currentState) => ({
                      ...currentState,
                      mobileNumber: e.target.value,
                    }));
                  }}
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasWhatsapp"
                  id="hasWhatsapp"
                  className="size-4"
                  checked={clientData.hasWhatsapp}
                  onChange={(e) => {
                    const value = !clientData.hasWhatsapp;

                    setClientData((currentState) => ({
                      ...currentState,
                      hasWhatsapp: value,
                    }));
                  }}
                />
                <label
                  htmlFor="hasWhatsapp"
                  className="font-medium text-sm ml-1"
                >
                  Has Whatsapp
                </label>
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block font-medium text-sm text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter Your Address"
                value={clientData.address}
                className="block w-full p-2 mt-1 border rounded-lg mb-4 placeholder:font-light placeholder:text-sm"
                onChange={(e) => {
                  setClientData((currentState) => ({
                    ...currentState,
                    address: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 font-semibold text-sm bg-gray-700 p-3 rounded-lg text-white"
              >
                {clientId ? "Save" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

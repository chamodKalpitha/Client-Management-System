import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { GET_CLIENTS } from "../queries/clientQueries";
import ClientRowData from "../components/ClientRowData";

export default function Clients() {
  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_CLIENTS, {
    variables: {
      first: 10,
      after: null,
      keyword: null,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { edges, pageInfo } = data.getClients;

  const loadMoreClients = () => {
    fetchMore({
      variables: {
        after: pageInfo.endCursor,
      },
    });
  };

  const handleSearch = () => {
    if (isSearching) {
      setKeyword("");
      setIsSearching(false);
      refetch({
        first: 10,
        after: null,
        keyword: null,
      });
    } else {
      setIsSearching(true);
      refetch({
        first: 10,
        after: null,
        keyword,
      });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <p className=" text-lg font-bold text-gray-900">List of Clients</p>
        <NavLink
          to={`new`}
          className="px-4 font-semibold text-sm bg-gray-700 p-3 rounded-lg text-white"
        >
          Create a Client
        </NavLink>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex relative">
          <input
            type="text"
            placeholder="Search by email or name"
            value={keyword}
            className="block p-2 border rounded-l-lg placeholder:font-light placeholder:text-sm w-80"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <button
            className="font-semibold text-sm bg-gray-700 px-6 h-full rounded-r-lg text-white absolute left-80"
            onClick={handleSearch}
          >
            {isSearching ? "Clear" : "Search"}
          </button>
        </div>
        <div className="w-60">
          <select
            name="HeadlineAct"
            id="HeadlineAct"
            className=" w-full h-full rounded-lg p-2 border text-gray-700 text-sm font-light "
          >
            <option value="">Please select</option>
            <option value="JM">John Mayer</option>
            <option value="SRV">Stevie Ray Vaughn</option>
            <option value="JH">Jimi Hendrix</option>
            <option value="BBK">B.B King</option>
            <option value="AK">Albert King</option>
            <option value="BG">Buddy Guy</option>
            <option value="EC">Eric Clapton</option>
          </select>
        </div>
      </div>
      <div className="rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                  No
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  email
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                  Mobile Number
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Address
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {edges.map((client, index) => {
                return (
                  <ClientRowData
                    key={client.id}
                    client={client}
                    index={index}
                  />
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 flex justify-center">
          <button
            onClick={loadMoreClients}
            disabled={!pageInfo.hasNextPage}
            className="px-4 font-semibold text-sm bg-gray-700 p-3 rounded-lg text-white"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      </div>
    </div>
  );
}

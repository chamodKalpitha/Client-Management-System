import React from "react";
import { NavLink } from "react-router-dom";

export default function Users() {
  console.log("hit");
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <p className=" text-lg font-bold text-gray-900">List of Users</p>
        <NavLink to={`new`}>
          <button
            type="submit"
            className="px-4 font-semibold text-sm bg-gray-700 p-3 rounded-lg text-white"
          >
            Create a User
          </button>
        </NavLink>
      </div>
      <div className="flex justify-between">
        <div className="w-80 pb-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Search"
            className="block w-full p-2 border rounded-lg mb-4 placeholder:font-light placeholder:text-sm"
          />
        </div>
        <div className="w-60">
          <select
            name="HeadlineAct"
            id="HeadlineAct"
            className=" w-full rounded-lg p-2 border text-gray-700 text-sm font-light "
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
                  Project Id
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Package
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                  Project Value
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Client
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Location
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  John Doe
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Web Developer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Mr Padmasena
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Panadura
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                    {" "}
                    <p className="whitespace-nowrap text-sm">Paid</p>
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-2 flex gap-1">
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
                  <a
                    href="#"
                    className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
          <ol className="flex justify-end gap-1 text-xs font-medium">
            <li>
              <a
                href="#"
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                1
              </a>
            </li>

            <li className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
              2
            </li>

            <li>
              <a
                href="#"
                className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                3
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                4
              </a>
            </li>

            <li>
              <a
                href="#"
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

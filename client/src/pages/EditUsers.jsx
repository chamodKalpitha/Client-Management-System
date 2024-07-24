import React from "react";
import { Form, redirect, json, useActionData } from "react-router-dom";
import client from "../apolloClient/client";
import { ADD_USER } from "../mutations/userMutations";
import toast from "react-hot-toast";
import ErrorAlert from "../components/ErrorAlert";

export async function action({ request, params }) {
  try {
    const userData = Object.fromEntries(await request.formData());

    if (userData.role === "notSelected")
      return toast.error("Please select a role");

    if (userData.empId.length < 10) return toast.error("Invalid EMP ID");

    const data = await client.mutate({
      mutation: ADD_USER,
      variables: userData,
    });
    toast.success("User created successfully ");

    return redirect("/dashboard/users");
  } catch (error) {
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      const errorMessage = error.graphQLErrors[0].message;
      const parsedError = JSON.parse(errorMessage);
      if (parsedError.messages) {
        return parsedError.messages;
      }
    }
    return toast.error("Something went wrong!");
  }
}

export default function EditUsers() {
  const actionData = useActionData();
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <p className=" text-lg font-bold text-gray-900">Add new user</p>
      </div>
      <div className=" flex justify-center">
        <div className=" w-1/2 flex-col">
          {actionData && <ErrorAlert errorList={actionData} />}
          <div className="flex justify-center">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="size-20 rounded-full object-cover hover:bg-slate-400"
            />
          </div>
          <Form method="post">
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
                className="block w-full p-2 mt-1 border rounded-lg mb-4 placeholder:font-light placeholder:text-sm"
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
                className="block w-full p-2 mt-1 border rounded-lg mb-4 placeholder:font-light placeholder:text-sm"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="empId"
                  className="block font-medium text-sm  text-gray-700"
                >
                  EMP Id
                </label>
                <input
                  type="text"
                  name="empId"
                  id="empId"
                  placeholder="Enter Your Email"
                  className="block w-full p-2 mt-1 border rounded-lg mb-4 placeholder:font-light placeholder:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="Role"
                  className="block font-medium text-sm  text-gray-700"
                >
                  Role
                </label>
                <select
                  name="role"
                  id="Role"
                  className="block w-full p-2 mt-1 border rounded-lg mb-4 "
                >
                  <option value="notSelected" defaultValue>
                    Please select
                  </option>
                  <option value="ASSISTANT">Assistant</option>
                  <option value="MANAGER">Manager</option>
                </select>
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
                className="block w-full p-2 mt-1 border rounded-lg mb-4 placeholder:font-light placeholder:text-sm"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 font-semibold text-sm bg-gray-700 p-3 rounded-lg text-white"
              >
                Save
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

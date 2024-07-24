import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "../components/ProfilePicture";

export default function Profile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [updatedUserData, setUpdatedUserData] = useState({
    name: user.name,
    address: user.address,
    profilePicture: user.profilePicture,
  });

  if (!user) {
    navigate("/");
  }

  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    const changed =
      updatedUserData.name === user.name &&
      updatedUserData.address === user.address
        ? false
        : true;
    setDataChanged(changed);
  }, [updatedUserData]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/forgot-password", { email: user.email });
      toast.success(
        "Password reset instructions sent! Please check your email."
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 h-11">
        <p className=" text-lg font-bold text-gray-900">Personal Information</p>
        {dataChanged && (
          <button
            type="submit"
            className="px-8 font-semibold text-sm bg-gray-700 p-3 rounded-lg text-white"
          >
            Save
          </button>
        )}
      </div>
      <div className=" flex justify-center">
        <div className=" w-1/2 flex-col">
          <div className="flex justify-center">
            <ProfilePicture />
          </div>
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
              value={updatedUserData.name}
              onChange={(e) => {
                setUpdatedUserData((currentState) => {
                  return { ...currentState, name: e.target.value };
                });
              }}
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
              value={user.email}
              readOnly
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
                value={user.empId}
                readOnly
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
                id="role"
                className="block w-full p-2 mt-1 border rounded-lg mb-4"
                value={user.role}
                disabled
              >
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
              value={updatedUserData.address}
              className="block w-full p-2 mt-1 border rounded-lg mb-4 placeholder:font-light placeholder:text-sm"
              onChange={(e) => {
                setUpdatedUserData((currentState) => {
                  return { ...currentState, address: e.target.value };
                });
              }}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 font-semibold text-sm bg-red-500 p-3 rounded-lg text-white"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

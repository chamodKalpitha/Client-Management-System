import React, { useState, useContext } from "react";
import axios from "axios";
import { useMutation, useLazyQuery } from "@apollo/client";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "../components/ProfilePicture";
import {
  UPDATE_PROFILE_PICTURE,
  DELETE_PROFILE_PICTURE,
  UPDATE_USER_PROFILE,
} from "../mutations/userMutations";
import { GET_SIGNED_URL } from "../queries/userQueries";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    name: user.name,
    address: user.address,
    profilePicture: user.profilePicture,
  });

  const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE);
  const [deleteProfilePicture] = useMutation(DELETE_PROFILE_PICTURE);
  const [getSignedUrl] = useLazyQuery(GET_SIGNED_URL, {
    fetchPolicy: "no-cache",
  });

  if (!user) {
    navigate("/");
  }

  const [dataChanged, setDataChanged] = useState(false);

  const handleFileChange = (file) => {
    setFile(file);
    setDataChanged(true);
  };

  const handleDelete = () => {
    deleteProfilePicture({
      variables: {
        id: user._id,
      },
    })
      .then((response) => {
        const newProfilePicture =
          response.data.deleteProfilePicture.profilePicture;

        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: newProfilePicture,
        }));

        setDataChanged(false);

        Swal.fire({
          title: "Deleted!",
          text: "Your profile picture has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          showConfirmButton: true,
        });
      });
  };

  const handleSave = async () => {
    if (file) {
      try {
        const { data: signedUrlData } = await getSignedUrl({
          variables: { id: user._id, fileName: file.name }, // Include file name
        });

        if (!signedUrlData || !signedUrlData.requestS3URL) {
          throw new Error("Failed to get signed URL");
        }

        const url = signedUrlData.requestS3URL.url;

        const response = await axios.put(url, file, {
          headers: {
            "Content-Type": file.type, // Ensure correct content type
          },
        });

        if (response.status === 200) {
          const { data } = await updateUserProfile({
            variables: {
              id: user._id,
              profilePicture: url.split("?")[0], // Save the URL without the query string
            },
          });

          if (data && data.updateUserProfile) {
            // Check if data and updateProfilePicture are defined
            const newProfilePicture = data.updateUserProfile.profilePicture;

            setUser((prevUser) => ({
              ...prevUser,
              profilePicture: newProfilePicture,
            }));

            Swal.fire({
              title: "Uploaded!",
              text: "Your profile picture has been updated.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            throw new Error("Failed to update profile picture");
          }
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          showConfirmButton: true,
        });
      }
    }

    setDataChanged(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 h-11">
        <p className=" text-lg font-bold text-gray-900">Personal Information</p>
        {dataChanged && (
          <button
            type="submit"
            className="px-8 font-semibold text-sm bg-gray-700 p-3 rounded-lg text-white"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>
      <div className=" flex justify-center">
        <div className=" w-1/2 flex-col">
          <div className="flex justify-center">
            <ProfilePicture
              onFileChange={handleFileChange}
              onDelete={handleDelete}
            />
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
                setDataChanged(true);
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
                setDataChanged(true);
              }}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 font-semibold text-sm bg-red-500 p-3 rounded-lg text-white"
              onClick={async (e) => {
                e.preventDefault();
                try {
                  await axios.post("/api/auth/forgot-password", {
                    email: user.email,
                  });
                  toast.success(
                    "Password reset instructions sent! Please check your email."
                  );
                } catch (error) {
                  console.log(error);
                  toast.error(error.response.data.error);
                }
              }}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

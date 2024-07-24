import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useMutation } from "@apollo/client";
import { DELETE_PROFILE_PICTURE } from "../mutations/userMutations";
import Swal from "sweetalert2";

export default function ProfilePicture() {
  const { user, setUser } = useContext(UserContext);

  const [deleteProfilePicture] = useMutation(DELETE_PROFILE_PICTURE);

  function handleDeleteProfilePicture() {
    console.log(user._id);
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
        deleteProfilePicture({
          variables: {
            id: user._id,
          },
        })
          .then((response) => {
            const newProfilePicture =
              response.data.deleteProfilePicture.profilePicture;

            console.log(newProfilePicture);

            setUser((prevUser) => ({
              ...prevUser,
              profilePicture: newProfilePicture,
            }));

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: `${error.message}`,
              icon: "error",
              showConfirmButton: true,
            });
          });
      }
    });
  }

  return (
    <div className="relative size-28">
      <img
        alt="Profile"
        src={user.profilePicture}
        className="w-full h-full rounded-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100 rounded-full">
        <div className="flex space-x-4 text-white">
          <button
            className="focus:outline-none bg-red-500 rounded-md p-1"
            title="Delete"
            onClick={handleDeleteProfilePicture}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#fff"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
          <button
            className="focus:outline-none bg-indigo-600 rounded-md p-1"
            title="Edit"
          >
            <input type="file" className="bg-red-300" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#fff"
            >
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

import Logo from "../components/assets/Logo.svg";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_JWT } from "../queries/userQueries";

export default function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLogoutClick() {
    try {
      await axios.post("/logout");
      setUser(null); // Clear the user from context
      navigate("/"); // Programmatically navigate to the login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return (
    <div className="grid grid-cols-[320px,_1fr]">
      <div className="h-screen overflow-y-auto">
        <div className="flex h-screen flex-col justify-between border-e bg-white">
          <div className="px-4 py-6">
            <img src={Logo} alt="" className="h-8" />

            <ul className="mt-6 space-y-1">
              <li>
                <NavLink
                  to={`complains`}
                  href="#"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? ""
                      : isActive
                      ? "block rounded-lg p-3 text-sm  font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 bg-gray-100"
                      : "block rounded-lg p-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }
                >
                  Complains
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={`projects`}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? ""
                      : isActive
                      ? "block rounded-lg p-3 text-sm  font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 bg-gray-100"
                      : "block rounded-lg p-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }
                >
                  Projects
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={`clients`}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? ""
                      : isActive
                      ? "block rounded-lg p-3 text-sm  font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 bg-gray-100"
                      : "block rounded-lg p-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }
                >
                  Clients
                </NavLink>
              </li>

              {user && user.role === "ADMIN" && (
                <li>
                  <NavLink
                    to={`users`}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "block rounded-lg p-3 text-sm  font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 bg-red-100"
                        : isActive
                        ? "block rounded-lg p-3 text-sm  font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 bg-gray-100"
                        : "block rounded-lg p-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }
                  >
                    Users
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink
                  to={`profile`}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? ""
                      : isActive
                      ? "block rounded-lg p-3 text-sm  font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 bg-gray-100"
                      : "block rounded-lg p-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
            <div className="flex justify-between items-center p-4">
              <div
                href="#"
                className="flex items-center gap-2 bg-white  hover:bg-gray-50"
              >
                <img
                  alt=""
                  src={user && user.profilePicture}
                  className="size-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs">
                    <strong className="block font-medium">
                      {user && user.name}
                    </strong>
                    <span>{user && user.email}</span>
                  </p>
                </div>
              </div>

              <span
                className="material-symbols-rounded text-gray-700 cursor-pointer"
                onClick={handleLogoutClick}
              >
                logout
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

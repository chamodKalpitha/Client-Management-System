import logo from "../components/assets/Logo.svg";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { validate } from "graphql";

export default function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/login", {
        email: loginData.email,
        password: loginData.password,
        rememberMe: loginData.rememberMe,
      });
      setUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Invalid login, Please try again");
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <div className="flex flex-col justify-center items-center h-screen px-2 ">
        <div className="w-full md:w-96 bg-gray-100 px-4 py-8 rounded-lg">
          <div className="flex justify-center">
            <img src={logo} alt="" className="h-8" />
          </div>
          <div className="">
            <form onSubmit={handleLoginSubmit}>
              <label
                htmlFor="email"
                className="block font-medium text-sm mt-6 text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                className="block w-full p-2 mt-1 border rounded-lg mb-4 placeholder:font-light placeholder:text-sm"
                value={loginData.email}
                onChange={(e) => {
                  setLoginData((currentState) => {
                    return { ...currentState, email: e.target.value };
                  });
                }}
              />
              <label
                htmlFor="password"
                className="font-medium text-sm text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your Password"
                className="block w-full p-2  mt-1 border rounded-lg mb-8 placeholder:font-light placeholder:text-sm"
                value={loginData.password}
                onChange={(e) => {
                  setLoginData((currentState) => {
                    return { ...currentState, password: e.target.value };
                  });
                }}
              />
              <div className="flex justify-between mb-8">
                <div className="flex">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={(e) => {
                      const value = !loginData.rememberMe;
                      setLoginData((currentState) => {
                        return { ...currentState, rememberMe: value };
                      });
                    }}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="font-medium text-sm text-gray-700 ml-1"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to={"/forget-password"}
                  className=" font-medium text-sm text-gray-700"
                >
                  Forget Password
                </Link>
              </div>
              <button
                type="submit"
                className="w-full font-semibold text-sm bg-gray-700 p-3 rounded-lg text-white "
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

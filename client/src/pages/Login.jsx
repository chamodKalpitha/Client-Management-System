import logo from "../components/assets/Logo.svg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen px-2 ">
        <div className="w-full md:w-96 bg-gray-100 px-4 py-8 rounded-lg">
          <div className="flex justify-center">
            <img src={logo} alt="" className="h-8" />
          </div>
          <div className="">
            <form action="">
              <label
                htmlFor="email"
                className="block font-medium text-sm mt-6 text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name=""
                id="email"
                placeholder="Enter Your Email"
                className="block w-full p-2 mt-1 border rounded-lg mb-4 placeholder:font-light placeholder:text-sm"
              />
              <label
                htmlFor="password"
                className="font-medium text-sm text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name=""
                id="password"
                placeholder="Enter your Password"
                className="block w-full p-2  mt-1 border rounded-lg mb-8 placeholder:font-light placeholder:text-sm"
              />
              <div className="flex justify-between mb-8">
                <div className="flex">
                  <input type="checkbox" id="rememberMe" />
                  <label
                    htmlFor="rememberMe"
                    className="font-medium text-sm text-gray-700 ml-1"
                  >
                    Remember me
                  </label>
                </div>
                <a className=" font-medium text-sm text-gray-700">
                  Forget Password
                </a>
              </div>
              <button className="w-full font-semibold text-sm bg-gray-700 p-3 rounded-lg text-white ">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

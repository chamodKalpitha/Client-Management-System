import logo from "../components/assets/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleForgetPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/forgot-password", { email });
      toast.success(
        "Password reset instructions sent! Please check your email."
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
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
          <div className="mt-6">
            <h1 className=" font-bold text-gray-700">Forgot Your Password?</h1>
            <p className="text-gray-600 mt-2 text-sm">
              No worries! Just enter your email address, and we'll send you
              instructions to reset your password.
            </p>
          </div>
          <div className="mt-6">
            <form onSubmit={handleForgetPasswordSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="w-full font-semibold text-sm mt-6 bg-gray-700 p-3 rounded-lg text-white "
              >
                Send Reset Instructions
              </button>
            </form>
            <div className="mt-4 text-center">
              <Link to={"/"} className=" font-medium text-sm text-gray-700">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

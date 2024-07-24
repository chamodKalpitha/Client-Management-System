import logo from "../components/assets/Logo.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { userId, token } = useParams();

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.password !== passwordData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      await axios.post(`/api/auth/reset-password/${userId}/${token}`, {
        password: passwordData.password,
      });
      toast.success("Password reset successful! Please log in.");
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
            <h1 className="font-bold text-gray-700">Reset Your Password</h1>
            <p className="text-gray-600 mt-2 text-sm">
              Please enter your new password below.
            </p>
          </div>
          <div className="mt-6">
            <form onSubmit={handleResetPasswordSubmit}>
              <label
                htmlFor="password"
                className="block font-medium text-sm mt-6 text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Your New Password"
                className="block w-full p-2 mt-1 border rounded-lg mb-4 placeholder:font-light placeholder:text-sm"
                value={passwordData.password}
                onChange={(e) => {
                  setPasswordData((currentState) => ({
                    ...currentState,
                    password: e.target.value,
                  }));
                }}
              />
              <label
                htmlFor="confirmPassword"
                className="block font-medium text-sm mt-6 text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Your New Password"
                className="block w-full p-2 mt-1 border rounded-lg mb-4 placeholder:font-light placeholder:text-sm"
                value={passwordData.confirmPassword}
                onChange={(e) => {
                  setPasswordData((currentState) => ({
                    ...currentState,
                    confirmPassword: e.target.value,
                  }));
                }}
              />
              <button
                type="submit"
                className="w-full font-semibold text-sm mt-6 bg-gray-700 p-3 rounded-lg text-white "
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

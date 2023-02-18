import React, { useState } from "react";
import { UserAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

function PasswordReset({ onClose }) {
  const [email, setEmail] = useState("");
  const { resetPassword } = UserAuth();
  const navigate = useNavigate();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none">
      <div className="w-96 px-5 pt-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="px-3 text-white text-lg">Password Reset</h2>
        <input
          type="search"
          id="default-search"
          className="block w-80 m-2 p-2 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Please enter Email"
          value={email}
          onChange={emailChangeHandler}
          required
        />

        <div className="flex justify-end py-3">
          <button
            onClick={onClose}
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;

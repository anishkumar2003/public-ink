import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../Features/Auth/authSlice';
import { Link, useNavigate } from "react-router";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate('/')
      console.log("Logout successful");
    } catch (err) {
      console.error("An error occurred while logging out:", err);
    } finally {
      console.log("Logout initiated");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-md text-lg transition duration-300 ease-in-out hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;

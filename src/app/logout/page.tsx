"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function LogoutBtn() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success!");
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <button
      onClick={logout}
      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;

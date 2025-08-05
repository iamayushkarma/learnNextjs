"use client";
import React, { useState } from "react";
import Navbar from "../nav/page";
import axios from "axios";
import Link from "next/link";

function ProfilePage() {
  const [data, setData] = useState("Nothing");
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-[100vh]">
        Profile page <br />
        <h1 className="4xl"></h1>
        <h2>
          {data === "Nothing" ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>
        <br />
        <button
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onClick={getUserDetails}
        >
          Get User details
        </button>
      </div>
    </>
  );
}

export default ProfilePage;

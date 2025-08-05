"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../nav/page";
import axios from "axios";
import Link from "next/link";

type UserType = {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
};

function ProfilePage() {
  const [data, setData] = useState<UserType | null>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me", {
          withCredentials: true, // if you're using cookies for auth
        });
        setData(res.data.data);
      } catch (err) {
        console.error("Error fetching user", err);
      }
    };

    getUserDetails();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-[100vh] flex-col">
        <p className="flex flex-col">
          {data ? (
            <Link className="text-4xl" href={`/profile/${data._id}`}>
              Wellcome,{" "}
              <span className="text-blue-500 font-extrabold">
                {data.username}
              </span>
            </Link>
          ) : (
            ""
          )}
        </p>
      </div>
    </>
  );
}

export default ProfilePage;

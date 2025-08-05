import React from "react";
import Navbar from "../nav/page";

function ProfilePage() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-[100vh]">
        Profile page
        <h1 className="4xl"></h1>
      </div>
    </>
  );
}

export default ProfilePage;

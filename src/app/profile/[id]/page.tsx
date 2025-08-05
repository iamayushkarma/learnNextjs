import React from "react";

function UserProfile({ params }: any) {
  return (
    <div>
      Profile page
      <h1 className="4xl">{params.id}</h1>
    </div>
  );
}

export default UserProfile;

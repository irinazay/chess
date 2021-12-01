import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated && <div className="profile">{user.nickname}</div>;
};

export default Profile;

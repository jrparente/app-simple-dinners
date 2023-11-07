import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function Profile() {
  const origin = import.meta.env.VITE_REACT_APP_SERVER_URL || "";
  const userID = window.localStorage.getItem("userID");
  const [user, setUser] = useState("");
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${origin}/auth/${userID}`, {
        headers: { authorization: cookies.access_token },
      });

      setUser(response.data);
    };

    fetchData();
  }, [userID]);
  console.log(user);
  return (
    <div className="container">
      <div className="flex flex-col ">
        <h2>Hello, {user.username}</h2>
        <p>Here you can view and modify your data.</p>
      </div>
    </div>
  );
}

export default Profile;

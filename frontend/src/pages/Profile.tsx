import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface user {
  email: string;
  username: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<user>({ email: "", username: "" });

  // decode jwt and get email and username
  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      const decodedtoken: user = jwtDecode(token);
      console.log(decodedtoken);
      setUser({
        email: decodedtoken?.email || "",
        username: decodedtoken?.username || "",
      });
    }
  }, []);

  // logout function
  const handleLogout = () => {
    Cookies.remove("jwt");
    navigate("/login");
  };
  return (
    <div className="flex justify-center  py-10  mx-2 md:mx-2">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="md:w-4/12 w-full p-4 bg-white rounded-lg shadow-md border border-blue-200">
          <p className="text-center text-slate-700 mx-auto text-4xl font-bold drop-shadow-sm mt-8">
            Your Profile
          </p>
          <div className=" py-7">
            <p>Username : {user.username}</p>
            <p>Email : {user.email}</p>
          </div>
          <p
            onClick={handleLogout}
            className=" text-right text-sm text-slate-700 cursor-pointer"
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

function AuthUser() {
  if (Cookies.get("jwt")) {
    const token = Cookies.get("jwt");

    if (token) {
      //   const decodedToken = jwt.decode(token);
      //   console.log(decodedToken);
      return <Outlet />;
    } else {
      return (
        <div>
          <Navigate to="/login" />
        </div>
      );
    }
  } else {
    return (
      <div>
        <Navigate to="/login" />
      </div>
    );
  }
}

export default AuthUser;

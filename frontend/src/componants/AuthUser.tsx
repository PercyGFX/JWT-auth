import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function AuthUser() {
  if (Cookies.get("jwt")) {
    const token = Cookies.get("jwt");

    if (token) {
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

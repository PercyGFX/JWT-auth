import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthUser() {
  const [apiSuccess, setApiSuccess] = React.useState(false);
  const navigate = useNavigate();
  if (Cookies.get("jwt")) {
    const token = Cookies.get("jwt");

    // verify token from backend
    if (token) {
      axios
        .get(`${process.env.REACT_APP_BACKEND}/jwtcheck`, {
          withCredentials: true,
        })
        .then((result) => {
          setApiSuccess(true);
        })
        .catch((error) => {
          Cookies.remove("jwt");
          navigate("/login");
        });
      return apiSuccess ? <Outlet /> : null;
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

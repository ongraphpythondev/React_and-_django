import React, { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const { user, authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUserName] = useState()

  let get_user_data = async () => {
    axios
      .get(`http://localhost:8000/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken.access,
        },
      })
      .then((res) => {
        console.log(res);
        setUserName(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const initialRender = useRef(true)
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (initialRender.current) {
      get_user_data();
      initialRender.current = false
    }
    
  },[username]);
  return (
    <>
      <h1>this is profile page {username}</h1>
    </>
  );
}

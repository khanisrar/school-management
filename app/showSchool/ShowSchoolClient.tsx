"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function ShowSchoolClient() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setLoggedIn(!!token);
  }, []);

  return <div>{loggedIn ? "Logged in" : "Not logged in"}</div>;
}

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-8 p-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Welcome to School Management
        </h1>
        <p className="text-gray-600 text-lg">Manage your schools efficiently</p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link
            href="/addSchool"
            className="bg-green-600 text-white px-8 py-4 rounded-xl text-xl font-medium shadow-lg hover:bg-green-800 transition-all duration-300">
            Add School
          </Link>

          <Link
            href="/showSchool"
            className="bg-blue-600 text-white px-8 py-4 rounded-xl text-xl font-medium shadow-lg hover:bg-blue-800 transition-all duration-300">
            Show Schools
          </Link>
        </div>
      </div>
    </main>
  );
}

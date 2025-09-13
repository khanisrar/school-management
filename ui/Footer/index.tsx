"use client";
import React, { useState, useEffect } from "react";

export default function Footer() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">About Us</h2>
            <p className="text-sm">
              We provide eco-friendly solutions and tips for sustainable living.
              Join us to make the planet greener.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              {loggedIn && (
                <li>
                  <a href="/addSchool" className="hover:text-white">
                    Add School
                  </a>
                </li>
              )}
              <li>
                <a href="/showSchool" className="hover:text-white">
                  Show School
                </a>
              </li>
            </ul>
          </div>

          <div className="">
            <h2 className="text-lg font-semibold mb-4 text-white">Contact</h2>
            <p className="text-sm mb-2">Email: support@example.com</p>
            <p className="text-sm">Phone: +91 9876543210</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
          © 2025 School Management. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

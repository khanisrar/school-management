"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomLoading from "@/ui/Common/CustomLoading";
import Heading from "@/ui/Common/Heading";
import Link from "next/link";
import toast from "react-hot-toast";

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: string | null;
}

export default function ShowSchool() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // ✅ Access localStorage only inside useEffect
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);

    const fetchSchools = async () => {
      try {
        const res = await fetch("/api/school");
        if (!res.ok) throw new Error("Failed to fetch schools");
        const data: School[] = await res.json();
        setSchools(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("Error fetching schools:", message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const handleRemove = async (id: number) => {
    try {
      const res = await fetch(`/api/school?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete school");
      setSchools((prev) => prev.filter((school) => school.id !== id));
      toast.success("School removed successfully!", {
        style: {
          background: "#d1fae5",
          color: "#065f46",
        },
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error("Error deleting school: " + message, {
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CustomLoading />
      </div>
    );
  }

  return (
    <main className="lg:px-16 md:px-8 px-6 pt-14">
      <Heading title="Schools List" />
      {loggedIn && (
        <Link href={"/addSchool"} className="flex justify-end mb-6">
          <button className="bg-green-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-green-700">
            + Add New School
          </button>
        </Link>
      )}
      {schools.length === 0 ? (
        <p>No schools available.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {schools.map((school) => (
            <li
              key={school.id}
              className="max-w-full flex flex-col bg-white p-6 pointer-events-auto transform scale-100 opacity-100 transition-all duration-300 ease-in-out drop-shadow-[0_0_5px_rgba(0,0,0,0.3)] hover:shadow-lg rounded-lg relative">
              {loggedIn && (
                <button
                  onClick={() => handleRemove(school.id)}
                  className="bg-red-600 absolute top-0 right-0 text-md font-bold text-white px-1 cursor-pointer rounded-bl-[3px] rounded-tr-[3px]"
                  title="Remove School">
                  ✕
                </button>
              )}
              {school.image ? (
                <Image
                  src={school.image}
                  width={256}
                  height={128}
                  alt={school.name}
                  className="w-full h-auto object-cover mb-2"
                />
              ) : (
                <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <p className="text-sm text-fuchsia-700 mb-2">
                {school.city}, {school.state}
              </p>
              <h3 className="text-2xl font-bold text-black">{school.name}</h3>
              <div className="flex justify-between w-full mt-4">
                <p className="font-semibold text-black">Address</p>
                <p className="text-black">{school.address}</p>
              </div>
              <div className="flex justify-between w-full mt-2">
                <p className="font-semibold text-black">Mobile No.</p>
                <p className="text-black">{school.contact}</p>
              </div>
              <div className="flex justify-between w-full mt-2">
                <p className="font-semibold text-black">Email ID</p>
                <p className="text-black">{school.email_id}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

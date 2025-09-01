"use client";

import { set, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Heading from "@/ui/Common/Heading";

type FormValues = {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: FileList;
};

export default function AddSchool () {
    
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const [mounted, setMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email_id", data.email_id);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]); 
    }

    try {
      const res = await fetch("/api/school", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to add school");
      reset(); 
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);

    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  if (!mounted) return null;

  return (
    <main className="flex flex-col items-center pt-14">
      <Heading title="Add School" />
     <form
  onSubmit={handleSubmit(onSubmit)}
  encType="multipart/form-data"
  className="flex flex-col gap-3 w-full max-w-xl bg-white p-8 shadow-lg rounded-lg"
>
  <div>
    <label className="block mb-1 font-medium">School Name :</label>
    <input
      {...register("name", { required: "School Name is required" })}
      placeholder="Enter School Name"
      className="border p-2 rounded w-full outline-none"
    />
    {errors.name && (
      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
    )}
  </div>

  <div>
    <label className="block mb-1 font-medium">School Address :</label>
    <input
      {...register("address", { required: "Address is required" })}
      placeholder="Enter School Address"
      className="border p-2 rounded w-full outline-none"
    />
    {errors.address && (
      <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
    )}
  </div>

  <div>
    <label className="block mb-1 font-medium">City :</label>
    <input
      {...register("city", { required: "City is required" })}
      placeholder="Enter City"
      className="border p-2 rounded w-full outline-none"
    />
    {errors.city && (
      <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
    )}
  </div>

  <div>
    <label className="block mb-1 font-medium">State :</label>
    <input
      {...register("state", { required: "State is required" })}
      placeholder="Enter State"
      className="border p-2 rounded w-full outline-none"
    />
    {errors.state && (
      <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
    )}
  </div>

  <div>
    <label className="block mb-1 font-medium">Contact :</label>
    <input
      type="tel"
      {...register("contact", {
        required: "Contact number is required",
        pattern: {
          value: /^[0-9]{10}$/,
          message: "Enter a valid 10-digit number",
        },
      })}
      placeholder="Enter Contact"
      className="border p-2 rounded w-full outline-none"
    />
    {errors.contact && (
      <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
    )}
  </div>

  {/* Email */}
  <div>
    <label className="block mb-1 font-medium">Email :</label>
    <input
      type="email"
      {...register("email_id", {
        required: "Email is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Enter a valid email address",
        },
      })}
      placeholder="Enter Email"
      className="border p-2 rounded w-full outline-none"
    />
    {errors.email_id && (
      <p className="text-red-500 text-sm mt-1">{errors.email_id.message}</p>
    )}
  </div>

  <div>
    <label className="block mb-1 font-medium">Upload Image :</label>
    <input
      type="file"
      {...register("image", { required: "Please upload an image" })}
      className="border p-2 rounded cursor-pointer w-full outline-none"
    />
    {errors.image && (
      <p className="text-red-500 text-sm mt-1 cursor-pointer">{errors.image.message}</p>
    )}
  </div>

  <button
    type="submit"
    className="bg-fuchsia-800 text-white py-2 px-4 mt-4 rounded hover:bg-fuchsia-900 cursor-pointer transition-all duration-300 ease-in-out"
  >
    Add School
  </button>
</form>


       {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-green-200 p-6 rounded-lg drop-shadow-[0_0_5px_rgba(0,0,0,0.7)] text-center max-w-sm w-full animate-fadeIn">
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              School Added Successfully!
            </h2>
          </div>
        </div>
      )}
         
      
    </main>
  );
};


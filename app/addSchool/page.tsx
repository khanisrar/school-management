"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Heading from "@/ui/Common/Heading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FormValues = {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: FileList;
};

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to login first!", {
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
        },
      });
      router.push("/login");
    } else {
      setMounted(true);
    }
  }, [router]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

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

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Unauthorized: Please log in again!", {
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
        },
      });
      router.push("/login");
      return;
    }

    console.log("Token from localStorage:", token);

    try {
      const res = await fetch("/api/school", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Failed to add school");

      reset();
      toast.success("School Added Successfully!", {
        style: {
          background: "#d1fae5",
          color: "#065f46",
        },
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error("Error: " + message, {
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <main className="flex flex-col items-center pt-14">
      <Heading title="Add School" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="flex flex-col gap-3 w-full max-w-xl bg-white p-8 shadow-lg rounded-lg">
        {/* School Name */}
        <div>
          <label className="block mb-1 font-medium">School Name:</label>
          <input
            {...register("name", { required: "School Name is required" })}
            placeholder="Enter School Name"
            className="border p-2 rounded w-full outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Address:</label>
          <input
            {...register("address", { required: "Address is required" })}
            placeholder="Enter Address"
            className="border p-2 rounded w-full outline-none"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block mb-1 font-medium">City:</label>
          <input
            type="text"
            {...register("city", {
              required: "City is required",
              pattern: {
                value: /^[A-Za-z\s-]+$/, // only letters, spaces, and hyphens
                message: "City must contain only letters",
              },
            })}
            placeholder="Enter City"
            className="border p-2 rounded w-full outline-none"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block mb-1 font-medium">State:</label>
          <input
            {...register("state", {
              required: "State is required",
              pattern: {
                value: /^[A-Za-z\s-]+$/, // only letters, spaces, and hyphens
                message: "State must contain only letters",
              },
            })}
            placeholder="Enter State"
            className="border p-2 rounded w-full outline-none"
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
          )}
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-1 font-medium">Contact:</label>
          <input
            type="tel"
            {...register("contact", {
              required: "Contact number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit number",
              },
            })}
            placeholder="Enter Contact Number"
            className="border p-2 rounded w-full outline-none"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contact.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email:</label>
          <input
            type="email"
            {...register("email_id", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
            placeholder="Enter Email"
            className="border p-2 rounded w-full outline-none"
          />
          {errors.email_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email_id.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Upload Image:</label>
          <input
            type="file"
            {...register("image", { required: "Please upload an image" })}
            className="border p-2 rounded cursor-pointer w-full outline-none"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-fuchsia-800 text-white py-2 px-4 mt-4 rounded transition-all duration-300 hover:bg-fuchsia-900 cursor-pointer ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}>
          {isSubmitting ? "Adding..." : "Add School"}
        </button>
      </form>
    </main>
  );
}

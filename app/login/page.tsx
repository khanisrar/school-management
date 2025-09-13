"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/ui/Common/Heading";
import toast from "react-hot-toast";

type FormValues = {
  email: string;
  otp: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendOtp = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to send OTP");

      setOtpSent(true);
      toast.success("OTP sent successfully!", {
        style: {
          background: "#d1fae5",
          color: "#065f46",
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error("Error sending OTP: " + message, {
        style: {
          background: "#d1fae5",
          color: "#065f46",
        },
      });
    } finally {
      setLoading(false);
    }
  });

  const verifyOtp = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, otp: data.otp }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Invalid OTP");

      await fetch("/api/create-user", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${result.token}`,
        },
      });

      localStorage.setItem("token", result.token || "dummy-token"); // store token
      toast.success("OTP Verify Successfully!", {
        style: {
          background: "#d1fae5",
          color: "#065f46",
        },
      });
      router.push("/");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error("Error verifying OTP: " + message, {
        style: {
          background: "#d1fae5",
          color: "#065f46",
        },
      });
    } finally {
      setLoading(false);
    }
  });

  return (
    <main className="flex-col items-center pt-14 flex justify-center pb-30">
      <Heading title="Login" />
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">Email OTP Authentication</h2>

        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // simple email regex
                message: "Please enter a valid email address",
              },
            })}
            type="email"
            className="border p-2 w-full rounded"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {!otpSent ? (
          <button
            onClick={sendOtp}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full cursor-pointer"
            disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        ) : (
          <>
            <div className="mb-4 mt-4">
              <label className="block mb-1">Enter OTP:</label>
              <input
                {...register("otp", { required: "OTP is required" })}
                type="text"
                className="border p-2 w-full rounded"
                placeholder="6-digit OTP"
              />
              {errors.otp && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <button
              onClick={verifyOtp}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full cursor-pointer"
              disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </main>
  );
}

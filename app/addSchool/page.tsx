"use client";

import { useForm } from "react-hook-form";
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

export default function AddSchool() {
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

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      alert("Error: " + message);
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
        {/* Your form fields */}
        {/* ... keep the rest of the inputs as-is ... */}
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
}

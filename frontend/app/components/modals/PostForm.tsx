"use client";
import React from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";

interface PostProps {
  setShowActivity: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostCreatedForm ({setShowActivity} : PostProps)  {
  const endpont = process.env.NEXT_PUBLIC_ENDPOINT ?? "http://localhost:3000";
  const [form, setForm] = React.useState({
    tenantId: "",
    actorId: "",
    actorName: "",
    type: "",
    title: "",
    description: "",
  });
    const tenantId =
    typeof window !== "undefined" ? localStorage.getItem("tenant-id") : null;


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      tenantId: tenantId,
      actorId: form.actorId,
      actorName: form.actorName,
      type: form.type,
      metadata: {
        title: form.title,
        description: form.description,
      },
    };


    try {
      const res = await axios.post(`${endpont}/activities`, payload);
      if(res.status == 201){
        setShowActivity(false)
      }

      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 bg-white shadow-2xl rounded-2xl relative  ">
        <div className="absolute -right-1 -top-3 p-2 bg-white rounded-full" onClick={()=>setShowActivity(false)}>

       
        <ImCross size={20} fill="red" className=""/>
         </div>
        
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-white p-4 sm:w-60 md:w-80 lg:w-100"
      >


        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Actor ID</span>
          <input
            name="actorId"
            value={form.actorId}
            onChange={handleChange}
            placeholder="Enter actor ID"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-gray-400"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Actor Name</span>
          <input
            name="actorName"
            value={form.actorName}
            onChange={handleChange}
            placeholder="Enter actor name"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-gray-400"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Type</span>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Select a type</option>
            <option value="NOTICE">NOTICE</option>
            <option value="REPORT">REPORT</option>
            <option value="ACTIVITY">ACTIVITY</option>
            <option value="UPDATE">UPDATE</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Title</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-gray-400"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter description"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-gray-400 resize-none"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

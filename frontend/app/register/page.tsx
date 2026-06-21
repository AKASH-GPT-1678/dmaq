"use client";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
const Register = () => {
  const [tenantId, setTenantId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const endpont = process.env.NEXT_PUBLIC_ENDPOINT ?? "http://localhost:3000";

  const handleSubmit = async () => {
    if (!tenantId.trim()) return;

    try {
      setLoading(true);

      const response = await axios.post(`${endpont}/register`, {
        tenantId,
      });

      console.log(response.data);
      if(response.data.success == true){
           router.push("/login");

      }
   

    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Register
        </h1>

        <p className="mb-6 text-center text-zinc-400">Enter new Tenant ID</p>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Tenant ID"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
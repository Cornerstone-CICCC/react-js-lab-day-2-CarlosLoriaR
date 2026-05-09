import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim()) {
      login(name);
      navigate("/todos");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-600 p-12 rounded-3xl shadow-2xl w-full max-w-2xl mx-4">
        <h1 className="text-3xl font-bold mb-10 text-white">
          Hi. What's your name?
        </h1>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="I"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            className="flex-1 px-4 py-3 border border-gray-400 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-white"
          />
          <button
            onClick={handleLogin}
            className="bg-gray-900 hover:bg-black text-white font-bold py-3 px-8 rounded-lg transition duration-200"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

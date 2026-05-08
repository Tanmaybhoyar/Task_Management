import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#111] border border-gray-800 rounded-2xl p-10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white tracking-wide">
            LOGIN
          </h1>

          <p className="text-gray-500 mt-3">
            Team Task Manager
          </p>
        </div>

        <div className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="w-full bg-black border border-gray-700 text-white p-4 rounded-xl outline-none focus:border-white transition"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full bg-black border border-gray-700 text-white p-4 rounded-xl outline-none focus:border-white transition"
            onChange={handleChange}
          />

          <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition duration-300">
            Login
          </button>
        </div>

        <p className="text-center text-gray-500 mt-8">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-white font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
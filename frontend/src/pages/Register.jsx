import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
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
      await API.post("/auth/signup", form);

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed"
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
            REGISTER
          </h1>

          <p className="text-gray-500 mt-3">
            Create your account
          </p>
        </div>

        <div className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="w-full bg-black border border-gray-700 text-white p-4 rounded-xl outline-none focus:border-white transition"
            onChange={handleChange}
          />

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

          <select
            name="role"
            className="w-full bg-black border border-gray-700 text-white p-4 rounded-xl outline-none focus:border-white transition"
            onChange={handleChange}
          >
            <option value="member">
              Member
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition duration-300">
            Register
          </button>
        </div>

        <p className="text-center text-gray-500 mt-8">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-white font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
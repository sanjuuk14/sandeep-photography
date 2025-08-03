import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const { data } = await axios.post(
      //   "http://localhost:5000/api/users/login",
      //   {
      //     email,
      //     password,
      //   }
      // );
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        { email, password }
      );

      // Save user info to localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      alert("Login successful");
      navigate("/admin-dashboard");
      // window.location.href = "/admin-dashboard";
      // or use useNavigate()
    } catch (error) {
      alert("Login failed: " + error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <form
        className="border p-4 rounded-2xl shadow-md w-full max-w-sm border-blue-400"
        onSubmit={handleLogin}
      >
        <p className="text-sm text-red-400">
          {" "}
          Admin Access Only ! <span>🔒</span>
        </p>
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        <input
          type="email"
          className="w-full bg-gray-800 p-2 mb-3 "
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          className="w-full border bg-gray-800 p-2 mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button
          className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded hover:bg-blue-700"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;

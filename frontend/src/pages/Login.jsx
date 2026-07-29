import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/notes");
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage("Failed to connect to server", error);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-row w-max bg-white p-8 rounded-2xl shadow-xl shadow-slate-400 border border-slate-100 gap-4">
        <div className="w-xs flex flex-col items-start">
          <h1 className="text-2xl font-bold text-center">NoteMe</h1>

          <p className="text-center text-gray-500 mt-2 mb-6">
            Login to your account
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Email</label>

            <input
              type="email"
              className="w-sm border rounded-lg p-3 outline-none focus:border-blue-500"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium  mb-2">Password</label>

            <input
              type="password"
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          {message !== "" && (
            <p className="text-red-500 text-sm mb-4">{message}</p>
          )}

          <div className="flex flex-row justify-end gap-6">
            <div className="flex items-center mx-8">
              <Link to="/register" className="hover:text-blue-600">
                Register
              </Link>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-4xl py-3 px-10 cursor-pointer"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

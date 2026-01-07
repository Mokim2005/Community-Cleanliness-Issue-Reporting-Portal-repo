import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaGoogle,
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();

  const from = location.state?.from?.pathname || "/";

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signIn(email, password);
      Swal.fire({
        title: "Welcome Back!",
        text: "Logged in successfully",
        icon: "success",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
        icon: "error",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // Sync with backend
      await fetch(
        "https://community-cleanliness-issue-reporti.vercel.app/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            lastLogin: new Date(),
          }),
        }
      );

      toast.success(`Logged in as ${user.displayName}`);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050b18] px-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] w-full max-w-md shadow-2xl relative z-10 transition-all duration-500">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-400 font-medium">
            Please enter your details to login
          </p>
        </div>

        <form onSubmit={handleLogIn} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1 italic">
              Email Address
            </label>
            <div className="relative group">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-secondary transition-colors" />
              <input
                type="email"
                name="email"
                placeholder="mail@example.com"
                ref={emailRef}
                required
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-all text-white"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-semibold text-slate-300 italic">
                Password
              </label>
              <button
                type="button"
                className="text-xs text-secondary hover:underline transition-all"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-secondary transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-all text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-secondary text-secondary-content font-black rounded-2xl shadow-xl shadow-secondary/20 hover:shadow-secondary/40 hover:-translate-y-1 transition-all duration-300 active:scale-95 flex justify-center items-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "LOGIN"
            )}
          </button>
        </form>

        <div className="divider before:bg-white/10 after:bg-white/10 text-slate-500 text-[10px] my-8 uppercase tracking-[0.3em] font-black">
          Secure Login
        </div>

        {/* Google Sign-in */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 active:scale-95 group"
        >
          <div className="p-1 bg-white rounded-md group-hover:scale-110 transition-transform">
            <FaGoogle className="text-red-500" />
          </div>
          Continue with Google
        </button>

        <p className="mt-10 text-center text-slate-400 font-medium">
          New to CleanCity?{" "}
          <Link
            to="/register"
            className="text-secondary font-black hover:underline underline-offset-8 decoration-2 transition-all"
          >
            Join the mission
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

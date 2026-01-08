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

  // থিম ডিটেকশন (Swal এর ব্যাকগ্রাউন্ডের জন্য)
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

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
        background: isDark ? "#1d232a" : "#fff",
        color: isDark ? "#fff" : "#000",
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
        background: isDark ? "#1d232a" : "#fff",
        color: isDark ? "#fff" : "#000",
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
    <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content px-4 relative overflow-hidden transition-colors duration-500">
      {/* Background Glows - থিম ফ্রেন্ডলি অপাসিটি */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="bg-base-200/50 backdrop-blur-2xl border border-base-300 p-8 md:p-10 rounded-[2.5rem] w-full max-w-md shadow-2xl relative z-10 transition-all duration-500">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black mb-3 tracking-tight">
            Welcome <span className="text-primary">Back</span>
          </h1>
          <p className="opacity-60 font-medium">
            Please enter your details to login
          </p>
        </div>

        <form onSubmit={handleLogIn} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold opacity-70 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:text-primary group-focus-within:opacity-100 transition-all" />
              <input
                type="email"
                name="email"
                placeholder="mail@example.com"
                ref={emailRef}
                required
                className="w-full bg-base-100 border border-base-300 p-4 pl-12 rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-bold opacity-70">Password</label>
              <button
                type="button"
                className="text-xs text-primary font-bold hover:underline transition-all"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:text-primary group-focus-within:opacity-100 transition-all" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                className="w-full bg-base-100 border border-base-300 p-4 pl-12 rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-all"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary w-full h-14 rounded-2xl font-black shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest ${
              loading ? "opacity-70" : ""
            }`}
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "LOGIN"
            )}
          </button>
        </form>

        <div className="divider opacity-20 text-[10px] my-8 uppercase tracking-[0.3em] font-black">
          Secure Login
        </div>

        {/* Google Sign-in */}
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full h-14 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-4 group border-base-300 hover:bg-base-300 text-base-content"
        >
          <div className="p-1 bg-white rounded-md group-hover:scale-110 transition-transform flex items-center justify-center shadow-sm">
            <FaGoogle className="text-red-500 text-sm" />
          </div>
          Continue with Google
        </button>

        <p className="mt-10 text-center font-medium opacity-70">
          New to CleanCity?{" "}
          <Link
            to="/register"
            className="text-primary font-black hover:underline underline-offset-8 decoration-2 transition-all ml-1"
          >
            Join the mission
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

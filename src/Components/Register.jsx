import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;

    // Password validation (Professional)
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters!");
      setLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter!");
      setLoading(false);
      return;
    }

    try {
      // 1. Create User
      const result = await createUser(email, password);
      
      // 2. Update Profile (Name & Photo)
      await updateUserProfile(name, photo);

      // 3. Save to Backend
      const res = await fetch("https://community-cleanliness-issue-reporti.vercel.app/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, photo, createdAt: new Date() }),
      });
      
      const data = await res.json();

      Swal.fire({
        title: "Success!",
        text: "Your account has been created successfully.",
        icon: "success",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
      });
      
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        background: "#0f172a",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      await fetch("https://community-cleanliness-issue-reporti.vercel.app/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          lastLogin: new Date(),
        }),
      });

      toast.success(`Welcome ${user.displayName}!`);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050b18] px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-secondary/20 rounded-full blur-[120px]"></div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl w-full max-w-lg shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Create Account</h1>
          <p className="text-slate-400">Join CleanCity and make a difference 🌱</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
            <div className="relative group">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
                className="w-full bg-white/5 border border-white/10 p-3 pl-12 rounded-2xl focus:outline-none focus:border-primary transition-all text-white"
              />
            </div>
          </div>

          {/* Photo Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Profile Photo URL</label>
            <div className="relative group">
              <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                name="photo"
                placeholder="https://image.link"
                className="w-full bg-white/5 border border-white/10 p-3 pl-12 rounded-2xl focus:outline-none focus:border-primary transition-all text-white"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
            <div className="relative group">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input
                type="email"
                name="email"
                placeholder="example@mail.com"
                required
                className="w-full bg-white/5 border border-white/10 p-3 pl-12 rounded-2xl focus:outline-none focus:border-primary transition-all text-white"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 p-3 pl-12 rounded-2xl focus:outline-none focus:border-primary transition-all text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-primary hover:bg-primary/80 text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Register Now"}
          </button>
        </form>

        <div className="divider before:bg-white/10 after:bg-white/10 text-slate-500 text-xs my-6 uppercase tracking-widest font-bold">OR CONTINUE WITH</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <FaGoogle className="text-red-500 text-lg" />
          Google
        </button>

        <p className="mt-8 text-center text-slate-400">
          Already a member?{" "}
          <Link to="/login" className="text-secondary font-bold hover:underline decoration-2 underline-offset-4">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
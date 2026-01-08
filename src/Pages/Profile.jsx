import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import {
  User,
  Mail,
  ShieldCheck,
  Settings,
  LogOut,
  Camera,
  Award,
  MapPin,
  Edit3,
  X,
  CheckCircle,
} from "lucide-react";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, logOut, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form States - ইউজার ডাটা চেঞ্জ হলে যাতে স্টেট আপডেট হয়
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhoto(user.photoURL || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ফাংশনটি কল করার আগে চেক করে নিচ্ছি
      if (typeof updateUserProfile !== "function") {
        throw new Error("Update function not found in Context!");
      }

      await updateUserProfile(name, photo);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে!",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--fallback-b1, #fff)",
        color: "var(--fallback-bc, #000)",
      });

      setIsEditing(false);

      // ডাটা রিয়েল টাইমে দেখানোর জন্য পেজটি রিলোড দেওয়া ভালো
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-500 pb-20 relative overflow-hidden">
      {/* 🔹 Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto relative z-10 pt-10"
      >
        {/* Profile Header Card */}
        <div className="bg-base-200 border border-base-300 rounded-[2.5rem] overflow-hidden shadow-xl">
          {/* Cover Photo Gradient */}
          <div className="h-44 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 w-full relative">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          <div className="px-6 md:px-12 pb-12">
            {/* Avatar & Basic Info */}
            <div className="relative -mt-20 mb-8 flex flex-col md:flex-row md:items-end gap-6 text-center md:text-left">
              <div className="relative inline-block mx-auto md:mx-0">
                <img
                  src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                  alt="Profile"
                  className="w-36 h-36 md:w-44 md:h-44 rounded-[2.5rem] object-cover border-8 border-base-200 shadow-2xl transition-transform hover:scale-105"
                />
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute bottom-2 right-2 p-3 bg-primary text-primary-content rounded-2xl hover:scale-110 transition-transform shadow-lg border-4 border-base-200"
                >
                  <Camera size={20} />
                </button>
              </div>

              <div className="flex-grow pb-2">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-3xl font-black tracking-tight uppercase italic">
                    {user?.displayName || "Community Member"}
                  </h1>
                  <ShieldCheck className="text-success" size={28} />
                </div>
                <p className="text-neutral font-bold opacity-70 flex items-center justify-center md:justify-start gap-2 text-sm uppercase tracking-widest">
                  <Mail size={16} className="text-primary" /> {user?.email}
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-square btn-outline border-base-300 hover:bg-base-300 rounded-2xl"
                >
                  <Edit3 size={20} />
                </button>
                <button
                  onClick={logOut}
                  className="btn btn-error btn-outline rounded-2xl gap-2 font-black uppercase text-xs tracking-widest"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 pt-10 border-t border-base-300">
              {[
                {
                  label: "Community Rank",
                  value: "Rank 04",
                  icon: Award,
                  color: "text-warning",
                },
                {
                  label: "Issues Reported",
                  value: "12",
                  icon: MapPin,
                  color: "text-primary",
                },
                {
                  label: "Account Status",
                  value: "Verified",
                  icon: CheckCircle,
                  color: "text-success",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-base-100 p-6 rounded-[2rem] border border-base-300 text-center hover:border-primary/50 transition-all shadow-sm"
                >
                  <stat.icon
                    className={`mx-auto mb-3 ${stat.color}`}
                    size={32}
                  />
                  <p className="text-2xl font-black italic">{stat.value}</p>
                  <p className="text-neutral text-[10px] font-bold uppercase tracking-widest mt-1 opacity-60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Account Info Detail */}
            <div className="mt-12">
              <h3 className="font-black uppercase tracking-widest text-[10px] opacity-50 mb-6 flex items-center gap-3">
                <span className="w-10 h-[2px] bg-primary"></span> Personal
                Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Full Name", value: user?.displayName },
                  { title: "Email Address", value: user?.email },
                  {
                    title: "Last Login",
                    value: user?.metadata?.lastSignInTime
                      ? new Date(
                          user.metadata.lastSignInTime
                        ).toLocaleDateString()
                      : "N/A",
                  },
                  {
                    title: "Member Since",
                    value: user?.metadata?.creationTime
                      ? new Date(
                          user.metadata.creationTime
                        ).toLocaleDateString()
                      : "N/A",
                  },
                ].map((info, i) => (
                  <div
                    key={i}
                    className="bg-base-300/30 border border-base-300 p-5 rounded-2xl shadow-inner"
                  >
                    <p className="text-[10px] uppercase font-black text-primary mb-1 tracking-tighter">
                      {info.title}
                    </p>
                    <p className="font-bold text-sm">
                      {info.value || "Not Set"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 🔹 EDIT PROFILE MODAL */}
      <AnimatePresence>
        {isEditing && (
          <div className="modal modal-open backdrop-blur-md transition-all">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-box bg-base-100 border border-base-300 rounded-[2.5rem] p-8 max-w-md"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black uppercase italic tracking-tighter">
                  Update Profile
                </h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-5">
                <div className="form-control">
                  <label className="label font-bold text-xs uppercase tracking-widest opacity-60">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered bg-base-200 rounded-xl font-bold focus:border-primary transition-all text-base-content"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label font-bold text-xs uppercase tracking-widest opacity-60">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    className="input input-bordered bg-base-200 rounded-xl font-bold focus:border-primary transition-all text-base-content"
                    placeholder="Image URL"
                    required
                  />
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn btn-primary w-full rounded-xl font-black uppercase tracking-widest ${
                      loading ? "loading disabled" : ""
                    }`}
                  >
                    {loading ? "Updating..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn btn-ghost w-full rounded-xl font-black uppercase tracking-widest text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;

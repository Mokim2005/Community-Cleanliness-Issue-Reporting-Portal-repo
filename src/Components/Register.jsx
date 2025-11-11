// Register.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;

    // Password validation
    if (password.length < 6) return alert("Password must be at least 6 characters");
    
    try {
      await createUser(email, password);
      
      // Save to backend
      const res = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, photo }),
      });
      const data = await res.json();
      if (!data.success) return alert(data.message);

      Swal.fire("Success", "Account created!", "success");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Error: " + err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // Send to backend
      await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: user.displayName, email: user.email, photo: user.photoURL }),
      });

      Swal.fire("Success", "Logged in with Google!", "success");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" required className="w-full p-2 rounded bg-gray-700"/>
          <input type="text" name="photo" placeholder="Photo URL" className="w-full p-2 rounded bg-gray-700"/>
          <input type="email" name="email" placeholder="Email" required className="w-full p-2 rounded bg-gray-700"/>
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" required className="w-full p-2 rounded bg-gray-700"/>
          <button type="submit" className="w-full p-2 bg-blue-600 rounded">Register</button>
        </form>
        <button onClick={handleGoogleSignIn} className="w-full mt-2 p-2 bg-red-600 rounded">Sign in with Google</button>
        <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-400">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;

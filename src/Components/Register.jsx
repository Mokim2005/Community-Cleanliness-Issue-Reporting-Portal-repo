import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";

const Register = () => {
  const { createUser, setUser } = use(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password, name, photoURL);
    createUser(email, password)
      .then((res) => {
        const user = res.user;
        // console.log(user);
        setUser(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="card flex mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <title>Register</title>
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Please Register</h1>
        <form onSubmit={handleRegister}>
          <fieldset className="fieldset">
            {/* name  */}
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Name"
              required
            />
            {/* Photo URL  */}
            <label className="label">Photo URL</label>
            <input
              name="photoURL"
              type="text"
              className="input"
              placeholder="PhotoURL"
              required
            />
            {/* email  */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />
            {/* pasword  */}
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
              required
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>
            <p>
              Already have an account, please
              <Link to="/login" className="text-green-600 underline">
                login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;

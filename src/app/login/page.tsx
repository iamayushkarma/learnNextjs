"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  // Validating user's input
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const validateInputs = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };
  const onLogin = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      const responce = await axios.post("/api/users/login", user);
      console.log(responce);
      toast.success("👋 Welcome back!");

      setTimeout(() => {
        router.push("/profile");
      }, 500);
    } catch (error: any) {
      console.log("login failed", error.message);
    }
  };
  // Toggle user password
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  return (
    <div className="flex flex-col items-center w-96 m-auto min-h-screen justify-center py-2">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-4/5 px-8 py-16 bg-[#09090b] border border-white/10 hover:border-white/20 focus-within:border-white/30 transition-colors duration-200 rounded-lg p-3">
        <h1 className=" relative bottom-4 text-3xl font-bold text-white mb-2 tracking-wide">
          Login
        </h1>
        <hr className="relative bottom-4 text-white/50" />
        {/* Email input */}
        <div className="w-8/12  mt-4 mb-0.5">
          <label htmlFor="email">Email</label>
        </div>
        <div className="flex h-[40px] text-[14px] text-white/60 w-[280px] items-center bg-[#09090b] border border-white/10 rounded-lg focus-within:ring-2 focus-within:ring-gray-700 focus-within:ring-offset-2 focus-within:ring-offset-[#09090b] transition-all duration-150 ease-in-out">
          <div className="ml-[10px]">
            <Mail height="1.4em" width="1.4em" />
          </div>
          <input
            placeholder="Enter your email"
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="bg-transparent text-[#f4f4f5] px-[10px] py-1 rounded-l-lg focus:outline-none w-full"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>
        )}
        {/* Password input */}
        <div className="w-8/12  mt-4 mb-0.5">
          <label htmlFor="password">Password</label>
        </div>
        <div className="flex h-[40px] text-[14px] text-white/60 w-[280px] items-center bg-[#09090b] border border-white/10 rounded-lg focus-within:ring-2 focus-within:ring-gray-700 focus-within:ring-offset-2 focus-within:ring-offset-[#09090b] transition-all duration-150 ease-in-out">
          <div className="ml-[10px]">
            <Lock height="1.4em" width="1.4em" />
          </div>
          <input
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="bg-transparent text-[#f4f4f5] px-[10px] py-1 rounded-l-lg focus:outline-none w-full"
          />
          <div id="password" onClick={togglePassword} className="mr-[10px]">
            {user.password.length > 0 ? (
              showPassword ? (
                <EyeOff height="1.4em" width="1.4em" />
              ) : (
                <Eye height="1.4em" width="1.4em" />
              )
            ) : null}
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>
        )}
        {/* Submit button */}
        <div className="relative top-6">
          <button
            className="py-2 px-4 bg-blue-500 hover:bg-blue-700  text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
            type="submit"
            onClick={onLogin}
          >
            Login
          </button>
          {/* <Link className="relative top-2 hover:underline text-" href="/login">
            Visit login page
          </Link> */}
          <p className="text-sm text-white/50 mt-4">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-white hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

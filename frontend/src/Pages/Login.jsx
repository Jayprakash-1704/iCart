import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { useContext } from "react";
// import login from "@/Context/authContext";
import { AuthContext } from "../Context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // Connect your backend here
      
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }


      console.log({
        email,
        password,
        rememberMe,
      });
      login(data);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="grid lg:grid-cols-2">

          {/* ================= LEFT SIDE ================= */}
          <div className="relative hidden lg:flex min-h-162.5 flex-col justify-between overflow-hidden bg-indigo-600 p-12 text-white">

            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-purple-500/20" />

            {/* Logo */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl  text-indigo-600">
                <img
              src="https://res.cloudinary.com/dhaztslbj/image/upload/v1789927947/iCart-fevicon_zbkgj6.jpg"
              alt="iCart Logo"
              className=" object-contain rounded-full"
            />
              </div>

              <span className="text-xl font-bold">
                iCart
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-200">
                Welcome Back
              </p>

              <h1 className="max-w-lg text-5xl font-bold leading-tight">
                Your shopping journey starts here.
              </h1>

              <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">
                Sign in to discover amazing products, manage your orders,
                save your favourites and enjoy a personalised shopping
                experience.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600 bg-yellow-200 text-sm font-bold text-gray-700">
                    A
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600 bg-pink-200 text-sm font-bold text-gray-700">
                    R
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600 bg-green-200 text-sm font-bold text-gray-700">
                    M
                  </div>
                </div>

                <div>
                  <p className="font-semibold">
                    10,000+ happy shoppers
                  </p>
                  <p className="text-sm text-indigo-200">
                    Shop smarter. Shop better.
                  </p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="relative z-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <ShieldCheck size={24} />

              <div>
                <p className="font-semibold">
                  Secure & Private
                </p>

                <p className="text-sm text-indigo-100">
                  Your information is protected.
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
            <div className="w-full max-w-md">

              {/* Mobile Logo */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <ShoppingBag size={23} />
                </div>

                <span className="text-xl font-bold text-gray-900">
                  iCart
                </span>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <p className="mb-2 text-sm font-semibold text-indigo-600">
                  Welcome back 👋
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Sign in to your account
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Enter your details to continue shopping.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* ================= FORM ================= */}
              <form onSubmit={handleLogin} className="space-y-5">

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>

                  <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 transition-all focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
                    <Mail
                      size={20}
                      className="mr-3 text-gray-400"
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full bg-transparent py-3.5 text-gray-900 outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 transition-all focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
                    <Lock
                      size={20}
                      className="mr-3 text-gray-400"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full bg-transparent py-3.5 text-gray-900 outline-none placeholder:text-gray-400"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(e.target.checked)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />

                    Remember me
                  </label>

                  <span className="text-xs text-gray-400">
                    Secure login
                  </span>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-600/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in

                      <ArrowRight
                        size={19}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-xs text-gray-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Google Button */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <span className="text-lg font-bold">
                  G
                </span>

                Continue with Google
              </button>

              {/* Register */}
              <p className="mt-7 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Create account
                </Link>
              </p>

              {/* Terms */}
              <p className="mt-6 text-center text-xs leading-5 text-gray-400">
                By continuing, you agree to our{" "}
                <Link
                  to="/terms"
                  className="underline hover:text-gray-600"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="underline hover:text-gray-600"
                >
                  Privacy Policy
                </Link>
                .
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
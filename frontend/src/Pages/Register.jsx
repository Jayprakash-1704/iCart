import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  User,
  Phone,
  ShoppingBag,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!phoneNumber.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (phoneNumber.length !== 10) {
      setError("Phone number must be 10 digits.");
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

    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            fullName,
            email,
            phoneNumber,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
  console.error("Registration failed:", data);

  throw new Error(
    data.message || data.error || `Registration failed (${response.status})`
  );
}

      console.log("Registration successful:", data);

      navigate("/login");
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

          <div className="relative hidden lg:flex min-h-175 flex-col justify-between overflow-hidden bg-indigo-600 p-12 text-white">

            {/* Decorative circles */}

            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />

            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-purple-500/20" />

            {/* Logo */}

            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl">
                <img
                  src="https://res.cloudinary.com/dhaztslbj/image/upload/v1789927947/iCart-fevicon_zbkgj6.jpg"
                  alt="iCart Logo"
                  className="h-11 w-11 rounded-full object-contain"
                />
              </div>

              <span className="text-xl font-bold">
                iCart
              </span>
            </div>

            {/* Content */}

            <div className="relative z-10">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-200">
                Join iCart
              </p>

              <h1 className="max-w-lg text-5xl font-bold leading-tight">
                Your shopping journey starts here.
              </h1>

              <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">
                Create your account and discover amazing products,
                manage your orders, save your favourites and enjoy a
                personalised shopping experience.
              </p>

              {/* Customers */}

              <div className="mt-8 flex items-center gap-3">
                <div className="flex -space-x-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600 bg-yellow-200 text-sm font-bold text-gray-700">
                    I
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600 bg-pink-200 text-sm font-bold text-gray-700">
                    Z
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600 bg-green-200 text-sm font-bold text-gray-700">
                    A
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

              <div className="mb-7 flex items-center gap-3 lg:hidden">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <ShoppingBag size={23} />
                </div>

                <span className="text-xl font-bold text-gray-900">
                  iCart
                </span>

              </div>

              {/* Heading */}

              <div className="mb-7">

                <p className="mb-2 text-sm font-semibold text-indigo-600">
                  Create your account 👋
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Join iCart today
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Create an account to start shopping with us.
                </p>

              </div>

              {/* Error */}

              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* ================= FORM ================= */}

              <form
                onSubmit={handleRegister}
                className="space-y-4"
              >

                {/* Full Name */}

                <div>

                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Full name
                  </label>

                  <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 transition-all focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">

                    <User
                      size={20}
                      className="mr-3 text-gray-400"
                    />

                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className="w-full bg-transparent py-3 text-gray-900 outline-none placeholder:text-gray-400"
                    />

                  </div>

                </div>

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
                      className="w-full bg-transparent py-3 text-gray-900 outline-none placeholder:text-gray-400"
                    />

                  </div>

                </div>

                {/* Phone */}

                <div>

                  <label
                    htmlFor="phoneNumber"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Phone number
                  </label>

                  <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 transition-all focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">

                    <Phone
                      size={20}
                      className="mr-3 text-gray-400"
                    />

                    <input
                      id="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      placeholder="Enter your phone number"
                      maxLength={10}
                      autoComplete="tel"
                      className="w-full bg-transparent py-3 text-gray-900 outline-none placeholder:text-gray-400"
                    />

                  </div>

                </div>

                {/* Password */}

                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

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
                      placeholder="Create a password"
                      autoComplete="new-password"
                      className="w-full bg-transparent py-3 text-gray-900 outline-none placeholder:text-gray-400"
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

                {/* Confirm Password */}

                <div>

                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Confirm password
                  </label>

                  <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 transition-all focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">

                    <Lock
                      size={20}
                      className="mr-3 text-gray-400"
                    />

                    <input
                      id="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      className="w-full bg-transparent py-3 text-gray-900 outline-none placeholder:text-gray-400"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>

                  </div>

                </div>

                {/* Terms */}

                <div className="flex items-start gap-2 pt-1">

                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) =>
                      setAgreeTerms(e.target.checked)
                    }
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />

                  <label
                    htmlFor="terms"
                    className="text-sm leading-5 text-gray-600"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>

                </div>

                {/* Register Button */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-600/30 disabled:cursor-not-allowed disabled:opacity-70"
                >

                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account

                      <ArrowRight
                        size={19}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}

                </button>

              </form>

              {/* Login */}

              <p className="mt-7 text-center text-sm text-gray-500">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Sign in
                </Link>

              </p>

              {/* Security */}

              <p className="mt-5 text-center text-xs leading-5 text-gray-400">
                Your personal information is securely protected.
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
// src/pages/auth/Login.jsx
import React, { useState, useContext } from "react";
import { FiPhone, FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate, Link } from "react-router-dom"; // Link আমদানি করুন
import lignimg from "../../assits/login/login.png";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { login } = useContext(AuthContext); // AuthProvider থেকে login ফাংশন আমদানি করুন
  const navigate = useNavigate();
  const { t } = useLanguage();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    // async ব্যবহার করুন যদি login ফাংশন async হয়
    e.preventDefault();

    // AuthProvider এর login ফাংশন কল করুন
    const result = await login(mobileNumber, password); // mobileNumber এবং password পাস করুন
    localStorage.setItem("user", true);

    if (result.success) {
      alert(result.message); // "Login successful!"
      navigate("/");
    } else {
      alert(result.message); // "Invalid mobile number or password."
    }
  };

  return (
    <section
      className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-white via-blue-50 to-blue-100 px-6 py-12"
      style={{ fontFamily: "var(--font-secondary)" }}
    >
      <div className="container flex max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-lg md:flex-row">
        {/* Left Image Section */}
        <div className="hidden p-12 md:block md:w-1/2">
          <img
            src={lignimg}
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="flex w-full flex-col justify-center p-10 md:w-1/2">
          <h2 className="mb-2 text-center text-3xl font-bold text-[#32E0BB]">
            {t.login.title}
          </h2>
          <p className="mb-10 text-center text-sm text-gray-600">
            {t.login.newsuer}
            <Link
              to="/register" // Link কম্পোনেন্ট ব্যবহার করুন
              className="font-semibold text-[#32E0BB] hover:underline"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              <span>{t.login.singupLink}</span>
            </Link>
          </p>

          <form noValidate className="space-y-6" onSubmit={handleSubmit}>
            {/* Phone Number */}
            <div>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiPhone className="text-gray-400" />
                </span>
                <input
                  id="phone"
                  type="tel"
                  placeholder={t.login.mobileNumber}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 py-3 pr-5 pl-10 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none"
                  style={{ fontFamily: "var(--font-secondary)" }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                {t.register.passwords}{" "}
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-3 focus:outline-none"
                >
                  {passwordVisible ? (
                    <FiEyeOff className="text-gray-400" />
                  ) : (
                    <FiEye className="text-gray-400" />
                  )}
                </button>
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-gray-300 py-3 pr-5 pl-10 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none"
                  style={{ fontFamily: "var(--font-secondary)" }}
                  required
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <FiLock className="text-gray-400" />
                </span>
              </div>
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center justify-end">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="text-primary-500 focus:ring-primary-700 h-4 w-4 rounded border-gray-300"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block pr-1 text-sm text-gray-900"
              >
                {t.login.remember}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-background bg-bgcolor-900 flex w-full items-center justify-center gap-3 rounded-xl py-3 text-lg font-semibold text-white transition hover:bg-[#2dcaaa]"
            >
              {t.login.buttontext}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

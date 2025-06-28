import React, { useState, useContext } from "react";
import { FiPhone, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import registerImg from "../../assits/login/register (2).png";
import toast from "react-hot-toast"; // toast আমদানি করুন
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { t } = useLanguage();
  const navigate = useNavigate();
  const { registerUser } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long."); // Show error toast
      return;
    }

    try {
      // Call the registerUser function from AuthContext
      const result = await registerUser(mobileNumber, password);

      if (result.success) {
        toast.success(result.message); // Show success toast
        // Redirect to login page after successful registration
        setTimeout(() => {
          navigate("/");
        }, 1500); // Redirect after 1.5 seconds so user can see the toast
      } else {
        toast.error(result.message); // Show error toast for failed registration
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An unexpected error occurred. Please try again."); // Generic error toast
    }
  };

  return (
    <section
      className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-white via-blue-50 to-blue-100 px-6 py-12"
      style={{ fontFamily: "var(--font-secondary)" }}
    >
      <div className="container flex h-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-lg md:flex-row">
        {/* Left Image Section */}
        <div className="hidden p-12 md:block md:w-1/2">
          <img
            src={registerImg}
            alt="Register Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="my-4 flex h-full w-full flex-col justify-center p-10 md:w-1/2">
          <h2 className="text-primary-500 mb-2 text-center text-3xl font-bold">
            {t.register.title}
          </h2>

          <p className="py-2 text-center text-base">{t.register.subtitle}</p>

          <form className="space-y-6" noValidate onSubmit={handleSubmit}>
            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                {t.register.mobileNumber}
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiPhone className="text-gray-400" />
                </span>
                <input
                  id="phone"
                  type="tel"
                  placeholder={t.register.mobileNumber}
                  className="w-full rounded-xl border border-gray-300 py-3 pr-5 pl-10 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none"
                  style={{ fontFamily: "var(--font-secondary)" }}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
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
                {t.register.passwords}
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
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-gray-300 py-3 pr-5 pl-10 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none"
                  style={{ fontFamily: "var(--font-secondary)" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <FiLock className="text-gray-400" />
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-background bg-primary-500 hover:bg-primary-600 flex w-full items-center justify-center gap-3 rounded-xl py-2 text-base font-semibold text-white transition"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {t.register.buttontext}
            </button>
          </form>

          {/* Link to Login */}
          <p className="mt-6 text-center text-gray-600">
            {t.register.alradyLogin}
            <Link
              to="/login"
              className="text-primary-500 font-semibold hover:underline"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {t.register.loginlink}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;

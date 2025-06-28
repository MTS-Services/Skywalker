import React, { useState, useContext } from "react";
import { FiPhone, FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext"; // Importing language context for translation
import { useNavigate, Link } from "react-router-dom";
import lignimg from "../../assits/login/login (2).png"; // Login image for visual representation
import { AuthContext } from "../../context/AuthContext"; // Importing Auth context
import toast from 'react-hot-toast'; // For displaying toast notifications

const Login = () => {
  // State variables for mobile number and password input fields
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  const { login } = useContext(AuthContext); // Accessing login function from AuthContext
  const navigate = useNavigate(); // To navigate to different pages
  const { t } = useLanguage(); // Language context for translations

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic form validation (optional but good practice)
    if (!mobileNumber || !password) {
      toast.error("Please enter both mobile number and password."); // Display error toast if any field is empty
      return;
    }

    try {
      // Calling login function from AuthContext
      const result = await login(mobileNumber, password);

      // If login is successful
      if (result.success) {
        toast.success(result.message); // Show success toast
        // Redirect to home after a short delay to show toast message
        setTimeout(() => {
          navigate("/"); 
        }, 1500);
      } else {
        toast.error(result.message); // Display error toast if login fails
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again."); // Display generic error toast if any issue occurs
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
          <h2 className="text-primary-500 mb-2 text-center text-3xl font-bold">
            {t.login.title} {/* Translated title */}
          </h2>
          <p className="mb-10 text-center text-sm text-gray-600">
            {t.login.newsuer}
            <Link
              to="/register" // Link to the register page
              className="text-primary-500 px-2 font-semibold hover:underline"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              <span>{t.login.singupLink}</span> {/* Translated signup link */}
            </Link>
          </p>

          <form noValidate className="space-y-6" onSubmit={handleSubmit}>
            {/* Phone Number */}
            <div>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiPhone className="text-gray-400" /> {/* Phone icon */}
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
                {t.register.passwords} {/* Translated password label */}
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
                  <FiLock className="text-gray-400" /> {/* Lock icon */}
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
                {t.login.remember} {/* Translated remember me label */}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-background bg-primary-500 hover:bg-primary-600 flex w-full items-center justify-center gap-3 rounded-xl py-2 text-base font-semibold text-white transition"
            >
              {t.login.buttontext} {/* Translated button text */}
            </button>
          </form>
        </div>
      </div>
      
   
    </section>
  );
};

export default Login;

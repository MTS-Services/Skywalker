import React, { useState } from "react"; // Import useState
import { FiPhone, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"; // Import FiEye and FiEyeOff
 import registerImg from "../../assits/login/login.png"
 import { useLanguage } from "../../context/LanguageContext";

const Register = () => {
  // States to manage password visibility for both fields

    const { isRTL, t, language } = useLanguage();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Function to toggle main password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
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
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="flex h-full w-full flex-col justify-center p-10 md:w-1/2 my-4">
          <h2 className="text-center text-3xl font-bold mb-2 text-[#32E0BB]">
            {t.register.title}
          </h2>

          <p className="text-center text-base">{t.register.subtitle}</p>

          <form className="space-y-6" noValidate>
            {/* Phone {t.register.title}Number */}
            {t.register.mobileNumber}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-gray-700"
              ></label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiPhone className="text-gray-400" />
                </span>
                <input
                  id="phone"
                  type="tel" // Use type="tel" for phone numbers
                  placeholder={t.register.mobileNumber}
                  className="w-full rounded-xl border border-gray-300 py-3 pr-5 pl-10 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none"
                  style={{ fontFamily: "var(--font-secondary)" }}
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
                />
                {/* Lock icon on the right for aesthetic, not interactive */}
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <FiLock className="text-gray-400" />
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-background flex w-full items-center justify-center gap-3 rounded-xl bg-[#32E0BB] py-3 text-lg font-semibold text-white transition hover:bg-[#152e6c]"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {t.register.buttontext}
            </button>
          </form>

          {/* Link to Login */}
          <p className="mt-6 text-center text-gray-600">
            {t.register.alradyLogin}
            <a
              href="/login"
              className="font-semibold text-[#32E0BB] hover:underline"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {t.register.loginlink}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;

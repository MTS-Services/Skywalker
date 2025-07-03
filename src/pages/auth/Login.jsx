import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import lignimg from "../../assits/login/login (2).png";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useLanguage } from "../../context/LanguageContext";
import ButtonSubmit from "../../common/button/ButtonSubmit";

const Login = () => {
  // State variables for mobile number and password input fields
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mobileNumber || !password) {
      toast.error("Please enter both mobile number and password.");
      return;
    }

    try {
      const result = await login(mobileNumber, password);

      if (result.success) {
        toast.success(result.message);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  // The JSX that defines the structure and appearance of the login form.
  return (
    <section
      className="flex items-center justify-center bg-gradient-to-tr from-white via-blue-50 to-blue-100 px-6 py-10 md:py-28 lg:h-screen"
      style={{ fontFamily: "var(--font-secondary)" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container flex h-auto max-w-6xl flex-col overflow-hidden rounded-3xl bg-white md:h-auto md:flex-row md:px-8 lg:shadow-lg">
        <div className="hidden p-12 md:block md:w-1/2">
          <img
            src={lignimg}
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex w-full flex-col justify-center p-6 md:w-1/2 md:p-8">
          <h1 className="mb-1 text-black lg:text-center">{t.login.title}</h1>
          <p className="mb-2 text-[13px] text-[#556885] lg:py-1 lg:text-center">
            {t.login.shortTitle}
          </p>

          <form noValidate className="space-y-6" onSubmit={handleSubmit}>
            {/* Input field for the mobile number with text-right class */}
            <div>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  placeholder={t.login.mobileNumber}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="focus:ring-primary-500 w-full rounded-xl border border-gray-300 px-4 py-3 text-left text-gray-600 placeholder-gray-400 transition focus:ring-1 focus:outline-none"
                  style={{ fontFamily: "var(--font-secondary)" }}
                  required
                />
              </div>
            </div>

            {/* Input field for the password with text-right class */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-600"
              ></label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder={t.register.passwords}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="focus:ring-primary-500 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-600 placeholder-gray-400 transition focus:ring-1 focus:outline-none"
                  style={{ fontFamily: "var(--font-secondary)" }}
                  required
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"></span>
              </div>
            </div>

            {/* Remember me checkbox */}
            {/* <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded border-gray-300"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block pr-1 text-sm text-gray-900"
              >
                {t.login.remember}
              </label>
            </div> */}
            <div>
              <Link
                to="/reset-password"
                className="text-[12px] font-[700] text-[#2e6290]"
              >
                {t?.login.forgotPassword}
              </Link>
            </div>
            {/* The submit button */}
            {/* <button
              type="submit"
              className="bg-background bg-primary-500 hover:bg-primary-600 flex w-full items-center justify-center gap-3 rounded-xl py-2 text-base font-semibold text-white transition"
            >
              {t.login.buttontext}
            </button> */}

            <ButtonSubmit
              text={
                <span>
                  <span className="flex items-center gap-2">
                    {t.login.buttontext}
                  </span>
                </span>
              }
              className="!w-full rounded-xl"
            />
          </form>
          {/* Link to Login */}
          <p className="mt-6 text-center text-gray-600">
            {t.login.newuserwithnoaccount}{" "}
            <Link
              to="/register"
              className="text-[12px] font-[700] text-[#2e6290]"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {t.login.registerforfree}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

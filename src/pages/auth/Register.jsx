import React, { useState, useContext } from "react";
import registerImg from "../../assits/login/register (2).png";
import toast from "react-hot-toast";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ButtonSubmit from "../../common/button/ButtonSubmit";

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

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const result = await registerUser(mobileNumber, password);

      if (result.success) {
        toast.success(result.message);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section className="flex items-center justify-center bg-gradient-to-tr from-white via-blue-50 to-blue-100 px-6 py-10 md:py-28 lg:h-screen">
      <div className="container flex h-auto max-w-6xl flex-col overflow-hidden rounded-3xl bg-white md:h-auto md:flex-row md:px-8 lg:shadow-lg">
        {/* Left Image (Hidden on small screens, visible on md and up) */}
        <div className="hidden p-12 md:block md:w-1/2">
          <img
            src={registerImg}
            alt="Register Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="flex w-full flex-col justify-center p-6 md:w-1/2 md:p-8">
          <h1 className="mb-1 text-black lg:text-center">{t.register.title}</h1>

          <p className="mb-2 text-[14px] text-[#556885] lg:text-center">
            {t.register.subtitle}
          </p>

          <form className="space-y-6" noValidate onSubmit={handleSubmit}>
            {/* Mobile Number */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-gray-600"
              ></label>
              <input
                id="phone"
                type="tel"
                placeholder={t.register.mobileNumber}
                className="focus:ring-primary-500 w-full rounded-xl border border-gray-300 px-4 py-3 text-left text-gray-600 placeholder-gray-400 transition focus:ring-1 focus:outline-none"
                style={{ fontFamily: "var(--font-secondary)" }}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-600"
              ></label>
              <div className="relative">
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder={t.register.passwords}
                  autoComplete="new-password"
                  className="focus:ring-primary-500 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-600 placeholder-gray-400 transition focus:ring-1 focus:outline-none"
                  style={{ fontFamily: "var(--font-secondary)" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              
              </div>
            </div>
            <div>
              <Link
                to="/terms"
                className="text-[12px] font-[700] text-[#2e6290]"
              >
                {t.register.byregistering}
              </Link>
            </div>
            <ButtonSubmit
              text={
                <span className="flex items-center gap-2">
                  {t.register.buttontext}
                </span>
              }
              className="!w-full rounded-xl"
            />
          </form>

          {/* Link to Login */}
          <p className="mt-6 text-center text-gray-600">
            {t.register.alradyLogin}{" "}
            <Link
              to="/login"
              className="text-[12px] font-[700] text-[#2e6290]"
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

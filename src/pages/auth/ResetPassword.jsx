import { useContext, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { AuthContext } from "../../context/AuthContext";

const generateRandomOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const ResetPassword = () => {
  const { t } = useLanguage([]);
  const { resetPassword } = useContext(AuthContext);

  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(60);

  const handleSendOtp = () => {
    if (!mobileNumber) return alert("Please enter mobile number");

    const generatedOtp = generateRandomOTP();
    setOtp(generatedOtp);
    setOtpSent(true);
    setTimer(60);
    setMessage(`OTP Sent: ${generatedOtp}`); // 👉 real project এ console.log করো
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === otp) {
      setOtpVerified(true);
      setOtpSent(false);
      setMessage("OTP verified. Now enter new password.");
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  const handleReset = () => {
    const result = resetPassword(mobileNumber, newPassword);
    setMessage(result.message);
  };

  return (
    <div className="relative mx-auto flex h-[84vh] w-full justify-end overflow-hidden bg-white px-4 pt-10 md:h-[70vh] lg:h-[100vh]">
      <div className="mx-auto max-w-[350px] text-center">
        <h2 className="mb-2 text-[18px] font-[700] text-[#242424]">
          {t.resetPasswordPage.resetPassword}
        </h2>
        <p className="text-center">
          {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
        </p>
        <p className="mb-6 text-[14px] text-[#556885]">
          {t.resetPasswordPage.wewilSendYou}
        </p>

        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder={t.resetPasswordPage.mobileNumber}
          className="mb-4 w-full rounded-md border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {!otpVerified && (
          <button
            onClick={handleSendOtp}
            className="bg-primary-500 hover:bg-primary-600 mb-4 w-full rounded px-4 py-3 text-white"
          >
            {t.resetPasswordPage.sendmetheactivation}
          </button>
        )}

        {otpSent && (
          <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
            <div className="w-[90%] max-w-md rounded-lg bg-white p-6 text-left shadow-xl">
              <h3 className="mb-2 text-lg font-bold">
                Verify your mobile number <span>{mobileNumber}</span>
              </h3>
              <p className="mb-2 text-sm text-gray-600">
                We sent you SMS message with OTP. Write it here to verify.
              </p>
              <p className="mb-4 text-sm text-gray-500">
                SMS not received?{" "}
                <span className="font-semibold">Wait for {timer} seconds</span>
              </p>

              <input
                type="text"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                placeholder="OTP Number"
                className="mb-4 w-full rounded-md border px-3 py-2"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setOtpSent(false)}
                  className="rounded bg-gray-100 px-4 py-2 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerifyOtp}
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        )}

        {otpVerified && (
          <>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={t.resetPasswordPage.newPassword || "New Password"}
              className="mb-4 w-full rounded-md border px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              onClick={handleReset}
              className="mb-4 w-full rounded bg-green-600 px-8 py-3 text-white hover:bg-green-700"
            >
              Confirm Password Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

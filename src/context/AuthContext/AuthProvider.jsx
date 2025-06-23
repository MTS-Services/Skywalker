import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  getAuth,
} from "firebase/auth";
import { app } from "./../../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app); // ✅ সরাসরি এখানেই getAuth(app)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState(null);

  // ✅ Send OTP
  const sendOtpWithPhoneNumber = async (phoneNumber) => {
    setLoading(true);

    // ✅ check and create recaptcha
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("Recaptcha Solved");
          },
          "expired-callback": () => {
            console.warn("Recaptcha expired");
          },
        },
        auth,
      );
    }

    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier,
      );
      setConfirmationResult(result);
      return result;
    } catch (err) {
      console.error("Failed to send OTP:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async (otpCode) => {
    setLoading(true);
    try {
      if (!confirmationResult) throw new Error("No OTP sent yet");
      await confirmationResult.confirm(otpCode);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Email registration
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        delete window.recaptchaVerifier;
      }
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    sendOtpWithPhoneNumber,
    verifyOtp,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
      <div id="recaptcha-container"></div> {/* recaptcha container */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

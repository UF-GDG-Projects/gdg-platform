import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import googleLogo from "../assets/auth/google.png";
import { useAccount } from "../auth/AccountContext";
import "./Login.css";

export default function Login({
  mode = "login",
}: {
  mode?: "login" | "signup";
}) {
  const { signInWithGoogle, error: accountError } = useAccount();
  const navigate = useNavigate();
  const signup = mode === "signup";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function continueWithGoogle() {
    setIsSubmitting(true);
    setMessage("");
    try {
      await signInWithGoogle();
      navigate(signup ? "/signup/personal" : "/profile");
    } catch (reason) {
      setMessage(
        reason instanceof Error ? reason.message : "Unable to sign in.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="auth-page" aria-label={signup ? "Sign up" : "Log in"}>
      <div className="auth-panel">
        <div
          className={`auth-panel-surface${signup ? " auth-panel-signup" : ""}`}
          aria-hidden="true"
        />
        <nav className="auth-tabs" aria-label="Account access">
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </nav>
        <button
          className="auth-google"
          type="button"
          disabled={isSubmitting}
          onClick={continueWithGoogle}
        >
          <img src={googleLogo} width="24" height="24" alt="" />
          {isSubmitting
            ? "Opening Google…"
            : signup
              ? "Sign Up with Google"
              : "Login with Google"}
        </button>
        <p className="auth-notice" role="status">
          {message ||
            accountError ||
            "Secure sign-in with Google and Firebase."}
        </p>
      </div>
    </section>
  );
}

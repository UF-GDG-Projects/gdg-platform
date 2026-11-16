import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import googleLogo from "../assets/auth/google.png";
import { signInWithGoogle } from "../firebase/auth";
import "./Login.css";

export default function Login({
  mode = "login",
}: {
  mode?: "login" | "signup";
}) {
  const signup = mode === "signup";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleGoogleSignIn() {
    setLoading(true);
    setMessage("");

    try {
      const { hasProfile } = await signInWithGoogle();

      navigate(hasProfile ? "/profile" : "/signup/personal", { replace: true });
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Google sign-in failed.",
      );
    } finally {
      setLoading(false);
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
          disabled={loading}
          onClick={handleGoogleSignIn}
        >
          <img src={googleLogo} width="24" height="24" alt="" />
          {loading
            ? "Connecting to Google..."
            : signup
              ? "Sign Up with Google"
              : "Login with Google"}
        </button>

        {message && (
          <p className="auth-notice" role="alert">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}

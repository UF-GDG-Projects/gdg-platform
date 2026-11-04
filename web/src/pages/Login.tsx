import { NavLink, useNavigate } from "react-router";
import googleLogo from "../assets/auth/google.png";
import { useDemoAccount } from "../demo/DemoAccount";
import "./Login.css";

export default function Login({
  mode = "login",
}: {
  mode?: "login" | "signup";
}) {
  const { signIn } = useDemoAccount();
  const navigate = useNavigate();
  const signup = mode === "signup";
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
          onClick={() => {
            if (signup) navigate("/signup/personal");
            else {
              signIn();
              navigate("/profile");
            }
          }}
        >
          <img src={googleLogo} width="24" height="24" alt="" />
          {signup ? "Sign Up with Google" : "Login with Google"}
        </button>
        <p className="auth-notice">
          Demo preview · Continue without a Google account.
        </p>
      </div>
    </section>
  );
}

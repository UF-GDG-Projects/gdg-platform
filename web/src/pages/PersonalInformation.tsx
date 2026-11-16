import { type FormEvent, useState } from "react";
import { Navigate } from "react-router";
import { useDemoAccount } from "../demo/DemoAccount";
import { saveMemberProfile } from "../firebase/auth";
import "./Account.css";

export default function PersonalInformation() {
  const { user, profile, loading, error } = useDemoAccount();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user || saving) return;

    const first = firstName.trim();
    const last = lastName.trim();

    if (!first || !last) {
      setMessage("Please enter your first and last name.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      await saveMemberProfile(user, first, last);

      // The account provider listens to Firestore.
      // Once the profile appears, this component
      // automatically redirects to /profile.
      setMessage("Profile created! Loading your account...");
    } catch (err) {
      console.error("Failed to create profile:", err);

      setMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong while creating your profile.",
      );

      setSaving(false);
    }
  }

  // Wait until Firebase has checked the user's session.
  if (loading) {
    return (
      <section className="personal-page">
        <p role="status">Loading your account...</p>
      </section>
    );
  }

  // Show Firestore or authentication errors.
  if (error) {
    return (
      <section className="personal-page">
        <p role="alert">Unable to load account: {error}</p>
      </section>
    );
  }

  // Only authenticated users can complete signup.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Existing users skip signup and go to their profile.
  if (profile) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <section className="personal-page">
      <div className="personal-panel">
        <form onSubmit={handleSubmit} className="personal-form">
          <h1>Personal Information</h1>

          <p className="account-status">Signed in as {user.email}</p>

          <div className="account-names">
            <label>
              First Name
              <span className="required">*</span>
              <input
                required
                autoComplete="given-name"
                value={firstName}
                maxLength={60}
                disabled={saving}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </label>

            <label>
              Last Name
              <span className="required">*</span>
              <input
                required
                autoComplete="family-name"
                value={lastName}
                maxLength={60}
                disabled={saving}
                onChange={(event) => setLastName(event.target.value)}
              />
            </label>
          </div>

          <button
            type="submit"
            className="account-primary signup-submit"
            disabled={saving || !firstName.trim() || !lastName.trim()}
          >
            {saving ? "Creating Account..." : "Sign Up"}
          </button>

          {message && (
            <p className="account-status" role="status">
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

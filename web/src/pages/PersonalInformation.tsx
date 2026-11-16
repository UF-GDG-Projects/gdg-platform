import { type FormEvent, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAccount } from "../auth/AccountContext";
import "./Account.css";

export default function PersonalInformation() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ufid, setUfid] = useState("");
  const { user, profile, saveProfile, isLoading } = useAccount();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) return;
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setUfid(profile.ufid);
  }, [profile]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;
    setMessage("");
    try {
      await saveProfile({
        ...(profile || {
          email: user?.email || "",
          ufid: "",
        }),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        ufid,
        email: user?.email || profile?.email || "",
        avatar: profile?.avatar || user?.photoURL || undefined,
      });
      navigate("/profile");
    } catch (reason) {
      setMessage(
        reason instanceof Error ? reason.message : "Unable to save profile.",
      );
    }
  }

  if (isLoading) return <p className="account-loading">Loading account…</p>;
  if (!user) return <Navigate to="/signup" replace />;

  return (
    <section className="personal-page">
      <div className="personal-panel">
        <form onSubmit={submit} className="personal-form">
          <h1>Personal Information</h1>
          <div className="account-names">
            <label>
              First Name <span className="required">*</span>
              <input
                required
                autoComplete="given-name"
                value={firstName}
                maxLength={60}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label>
              Last Name <span className="required">*</span>
              <input
                required
                autoComplete="family-name"
                value={lastName}
                maxLength={60}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>
          <label>
            UFID
            <input
              inputMode="numeric"
              pattern="[0-9]{8}"
              maxLength={8}
              title="Enter 8 digits or leave this optional field blank"
              value={ufid}
              onChange={(e) => setUfid(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="account-primary signup-submit"
            disabled={!firstName.trim() || !lastName.trim()}
          >
            Sign Up
          </button>
        </form>
      </div>
      <p className="account-status" role="status">
        {message || `Signed in as ${user.email || "your Google account"}.`}
      </p>
      <Link to="/signup" className="demo-back">
        Back to Sign Up
      </Link>
    </section>
  );
}

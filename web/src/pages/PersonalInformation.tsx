import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDemoAccount } from "../demo/DemoAccount";
import "./Account.css";

export default function PersonalInformation() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ufid, setUfid] = useState("");
  const { saveProfile } = useDemoAccount();
  const navigate = useNavigate();
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;
    saveProfile({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      ufid,
      email: "demo@example.com",
    });
    navigate("/profile");
  }
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
      <p className="demo-caption">
        Demo only · Use sample information. Nothing is sent or saved after
        refresh.
      </p>
      <Link to="/signup" className="demo-back">
        Back to Sign Up
      </Link>
    </section>
  );
}

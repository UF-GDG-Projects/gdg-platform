import { type FormEvent, useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router";

import avatar from "../assets/auth/avatar.png";
import chevron from "../assets/auth/chevron.svg";
import editIcon from "../assets/auth/edit.svg";
import logoutIcon from "../assets/auth/logout.svg";
import profileIcon from "../assets/auth/profile.svg";
import settingsIcon from "../assets/auth/settings.svg";

import { type DemoProfile, useDemoAccount } from "../demo/DemoAccount";

import "./Account.css";

// Displays the user's real Firebase profile information.
function Identity({ person }: { person: DemoProfile }) {
  return (
    <div className="account-identity">
      <img src={person.avatar || avatar} alt="" width="58" height="58" />

      <div>
        <p>
          {person.firstName} {person.lastName}
        </p>
        <p className="account-email">{person.email}</p>
      </div>
    </div>
  );
}

// Edit and save profile information to Firestore.
function ProfileForm({ person }: { person: DemoProfile }) {
  const { saveProfile } = useDemoAccount();

  const [draft, setDraft] = useState<DemoProfile>(person);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(person);
  }, [person]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!draft.firstName.trim() || !draft.lastName.trim()) {
      setMessage("Please enter a first and last name.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      await saveProfile({
        ...draft,
        firstName: draft.firstName.trim(),
        lastName: draft.lastName.trim(),
      });

      setMessage("Profile successfully saved to Firestore!");
    } catch (error) {
      console.error("Profile save failed:", error);

      setMessage(
        error instanceof Error ? error.message : "Unable to save profile.",
      );
    } finally {
      setSaving(false);
    }
  }

  function field(
    label: string,
    key: "firstName" | "lastName" | "email" | "ufid",
  ) {
    const readOnly = key === "email" || key === "ufid";

    return (
      <label>
        {label}
        <span className="account-input">
          <input
            required={!readOnly}
            readOnly={readOnly}
            type={key === "email" ? "email" : "text"}
            autoComplete={
              key === "firstName"
                ? "given-name"
                : key === "lastName"
                  ? "family-name"
                  : undefined
            }
            maxLength={100}
            value={draft[key]}
            placeholder={key === "ufid" ? "Not collected" : undefined}
            onChange={(event) => {
              if (readOnly) return;

              setDraft({
                ...draft,
                [key]: event.target.value,
              });

              setMessage("");
            }}
          />

          {!readOnly && <img src={editIcon} alt="" />}
        </span>
      </label>
    );
  }

  return (
    <form className="profile-form" onSubmit={submit}>
      <div className="profile-heading">
        <Identity person={draft} />

        <span className="avatar-edit" title="Profile photo editing coming soon">
          <img src={editIcon} alt="" />
        </span>
      </div>

      <div className="account-names">
        {field("First Name", "firstName")}
        {field("Last Name", "lastName")}
      </div>

      {field("Email", "email")}
      {field("UFID", "ufid")}

      <label>
        Role - Can only be edited by admin
        <input value="Member" readOnly />
      </label>

      <div className="account-actions">
        <button type="submit" className="account-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && (
        <p className="account-status" role="status">
          {message}
        </p>
      )}
    </form>
  );
}

// Settings remain local-only until Firestore settings
// persistence and notification delivery are implemented.
function Settings() {
  const { settings, saveSettings } = useDemoAccount();

  const [draft, setDraft] = useState(settings);
  const [message, setMessage] = useState("");

  function toggle(
    label: string,
    key: "dark" | "events" | "meetings",
    detail?: string,
  ) {
    return (
      <div className="setting-row">
        <div>
          <span>{label}</span>
          {detail && <p>{detail}</p>}
        </div>

        <button
          type="button"
          role="switch"
          aria-label={label}
          aria-checked={draft[key]}
          className="account-switch"
          onClick={() => {
            setDraft({
              ...draft,
              [key]: !draft[key],
            });
            setMessage("");
          }}
        >
          <span />
        </button>
      </div>
    );
  }

  function reminder(
    label: string,
    key: "eventReminder" | "meetingReminder",
    enabled: boolean,
  ) {
    return (
      <div className="setting-row">
        <div>
          <span>{label}</span>
          <p>
            Send reminders about{" "}
            {key === "eventReminder" ? "events" : "meetings"}
          </p>
        </div>

        <fieldset disabled={!enabled} className="reminder-options">
          <legend className="sr-only">{label}</legend>

          {["30 Minutes", "1 Hour", "24 Hours"].map((value) => (
            <label key={value}>
              <input
                type="radio"
                name={key}
                checked={draft[key] === value}
                onChange={() => {
                  setDraft({
                    ...draft,
                    [key]: value,
                  });
                  setMessage("");
                }}
              />
              <span>{value}</span>
            </label>
          ))}
        </fieldset>
      </div>
    );
  }

  function submitSettings(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    saveSettings(draft);
    setMessage(
      "Settings saved for this session. Notifications are not active yet.",
    );
  }

  return (
    <form
      className={`settings-form${draft.dark ? " settings-preview-dark" : ""}`}
      onSubmit={submitSettings}
    >
      <h1 className="sr-only">Settings</h1>

      {toggle("Dark Theme", "dark")}

      <h2>Push Notifications</h2>

      {toggle("New Events", "events", "Send notifications about new events")}

      {reminder("Events Reminders", "eventReminder", draft.events)}

      {toggle(
        "New Meetings",
        "meetings",
        "Send notifications about new meetings",
      )}

      {reminder("Meeting Reminders", "meetingReminder", draft.meetings)}

      <div className="account-actions">
        <button type="submit" className="account-primary">
          Save Changes
        </button>
      </div>

      {message && (
        <p className="account-status" role="status">
          {message}
        </p>
      )}
    </form>
  );
}

// Main authenticated profile page.
export default function Profile({
  settingsPage = false,
}: {
  settingsPage?: boolean;
}) {
  const { user, profile, loading, error, settings, logOut } = useDemoAccount();

  const navigate = useNavigate();
  const [logoutError, setLogoutError] = useState("");

  async function handleLogout() {
    setLogoutError("");

    try {
      await logOut();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      setLogoutError(
        error instanceof Error ? error.message : "Unable to log out.",
      );
    }
  }

  if (loading) {
    return <p role="status">Loading your Firebase profile...</p>;
  }

  if (error) {
    return <p role="alert">Unable to load your profile: {error}</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!profile) {
    return <Navigate to="/signup/personal" replace />;
  }

  return (
    <section className={`account-page${settings.dark ? " account-dark" : ""}`}>
      <p className="demo-caption">
        Signed in with Google. Profile changes are saved to Firestore.
        Notification settings are still a preview.
      </p>

      <div className="account-shell">
        <div className="account-interior">
          <aside className="account-sidebar">
            <Identity person={profile} />

            <nav aria-label="Profile navigation">
              <NavLink to="/profile" end>
                <img src={profileIcon} alt="" />
                Profile
                <img className="nav-chevron" src={chevron} alt="" />
              </NavLink>

              <NavLink to="/profile/settings">
                <img src={settingsIcon} alt="" />
                Settings
                <img className="nav-chevron" src={chevron} alt="" />
              </NavLink>

              <button
                type="button"
                className="account-logout"
                onClick={handleLogout}
              >
                <img src={logoutIcon} alt="" />
                Log Out
              </button>
            </nav>
          </aside>

          <div className="account-content">
            {logoutError && <p role="alert">{logoutError}</p>}

            {settingsPage ? <Settings /> : <ProfileForm person={profile} />}
          </div>
        </div>
      </div>
    </section>
  );
}

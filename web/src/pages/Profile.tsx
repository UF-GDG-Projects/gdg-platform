import { type ChangeEvent, type FormEvent, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router";
import avatar from "../assets/auth/avatar.png";
import chevron from "../assets/auth/chevron.svg";
import editIcon from "../assets/auth/edit.svg";
import logoutIcon from "../assets/auth/logout.svg";
import profileIcon from "../assets/auth/profile.svg";
import settingsIcon from "../assets/auth/settings.svg";
import { type DemoProfile, useDemoAccount } from "../demo/DemoAccount";
import "./Account.css";

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
function ProfileForm({ person }: { person: DemoProfile }) {
  const { saveProfile } = useDemoAccount();
  const [draft, setDraft] = useState(person);
  const [message, setMessage] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!draft.firstName.trim() || !draft.lastName.trim()) {
      setMessage("Please enter a first and last name.");
      return;
    }
    saveProfile({
      ...draft,
      firstName: draft.firstName.trim(),
      lastName: draft.lastName.trim(),
    });
    setMessage("Profile saved for this demo.");
  }
  function photo(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (
      !["image/png", "image/jpeg", "image/webp"].includes(file.type) ||
      file.size > 2_000_000
    ) {
      setMessage("Choose a PNG, JPG, or WebP under 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDraft((d) => ({ ...d, avatar: String(reader.result) }));
      setMessage("Photo selected. Save Changes to keep it in this demo.");
    };
    reader.readAsDataURL(file);
  }
  function field(
    label: string,
    key: "firstName" | "lastName" | "email" | "ufid",
  ) {
    return (
      <label>
        {label}
        <span className="account-input">
          <input
            required={key !== "ufid"}
            type={
              key === "email" ? "email" : key === "ufid" ? "password" : "text"
            }
            inputMode={key === "ufid" ? "numeric" : undefined}
            pattern={key === "ufid" ? "[0-9]{8}" : undefined}
            maxLength={key === "ufid" ? 8 : 100}
            value={draft[key]}
            onChange={(e) => {
              setDraft({ ...draft, [key]: e.target.value });
              setMessage("");
            }}
          />
          <img src={editIcon} alt="" />
        </span>
      </label>
    );
  }
  return (
    <form className="profile-form" onSubmit={submit}>
      <div className="profile-heading">
        <Identity person={draft} />
        <label className="avatar-edit" aria-label="Change profile picture">
          <img src={editIcon} alt="" />
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={photo}
          />
        </label>
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
        <button type="submit" className="account-primary">
          Save Changes
        </button>
      </div>
      <p className="account-status" role="status">
        {message}
      </p>
    </form>
  );
}
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
            setDraft({ ...draft, [key]: !draft[key] });
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
                  setDraft({ ...draft, [key]: value });
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
  return (
    <form
      className={`settings-form${draft.dark ? " settings-preview-dark" : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        saveSettings(draft);
        setMessage(
          "Settings saved for this demo. No notifications will be sent.",
        );
      }}
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
      <p className="account-status" role="status">
        {message}
      </p>
    </form>
  );
}
export default function Profile({
  settingsPage = false,
}: {
  settingsPage?: boolean;
}) {
  const { profile, settings, logOut } = useDemoAccount();
  const navigate = useNavigate();
  if (!profile) return <Navigate to="/login" replace />;
  return (
    <section className={`account-page${settings.dark ? " account-dark" : ""}`}>
      <p className="demo-caption">
        Demo account · Changes last until refresh. No real sign-in or
        notifications.
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
                onClick={() => {
                  logOut();
                  navigate("/login", { replace: true });
                }}
              >
                <img src={logoutIcon} alt="" />
                Log Out
              </button>
            </nav>
          </aside>
          <div className="account-content">
            {settingsPage ? <Settings /> : <ProfileForm person={profile} />}
          </div>
        </div>
      </div>
    </section>
  );
}

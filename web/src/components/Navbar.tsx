import { useState } from "react";
import { NavLink } from "react-router";
import demoAvatar from "../assets/auth/avatar.png";
import gdgLogo from "../assets/gdg-logo.svg";
import { useDemoAccount } from "../demo/DemoAccount";

const links = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Officers", to: "/officers" },
  { label: "Resources", to: "/resources" },
  { label: "FAQ", to: "/faq" },
];

const DISCORD_INVITE = "https://discord.gg/B8hzpMvCQ";

const styles = `
  .gdg-header { position:relative; z-index:50; margin:0 auto; padding:30px 30px 0; width:100%; max-width:1440px; box-sizing:border-box; }
  .gdg-header * { box-sizing:border-box; }
  .gdg-header-row { display:flex; align-items:center; width:100%; }
  .gdg-nav-pill { display:flex; align-items:center; flex:1 1 840px; max-width:840px; min-width:0; height:40px; padding:0 20px; border-radius:9999px; background:#fff; box-shadow:0 4px 0 rgba(0,0,0,.075),0 9px 17px rgba(0,0,0,.15); }
  .gdg-home-link { flex:none; display:flex; align-items:center; justify-content:center; }
  .gdg-home-logo { display:block; width:47px; height:23px; object-fit:contain; }
  .gdg-main-nav { display:flex; align-items:center; justify-content:space-between; gap:7px; flex:1; min-width:0; margin-left:35px; }
  .gdg-main-link { font-family:Outfit, sans-serif; font-size:clamp(13px, 1.34vw, 20px); line-height:1.25; color:#2d2d2d; text-decoration:none; white-space:nowrap; transition:color .15s; }
  .gdg-main-link:hover, .gdg-main-link.active { color:#4285f4; }
  .gdg-main-link.active { font-weight:600; }
  .gdg-social-links { display:flex; align-items:center; gap:28px; margin-left:30px; flex:none; }
  .gdg-social { display:flex; align-items:center; justify-content:center; width:58px; height:40px; border-radius:11px; color:#fff; box-shadow:0 3px 0 rgba(0,0,0,.07),0 6px 12px rgba(0,0,0,.12); }
  .gdg-instagram { background:linear-gradient(30deg,#ffd33d 0%,#fd2656 42%,#df19c9 75%,#8243fa 100%); }
  .gdg-discord { background:#5865f2; }
  .gdg-auth { display:flex; align-items:center; justify-content:space-between; gap:8px; flex:none; width:212px; height:40px; margin-left:auto; padding-left:12px; color:#767676; font:400 clamp(13px,1.34vw,20px)/1.2 Outfit,sans-serif; white-space:nowrap; }
  .gdg-profile { display:flex; align-items:center; justify-content:center; flex:none; width:31px; height:31px; overflow:hidden; border-radius:50%; background:#e7e8ea; color:#aaaeb1; }
  .gdg-mobile-toggle { display:none; align-items:center; justify-content:center; margin-left:auto; padding:8px 15px; border-radius:999px; border:1px solid #e8e8e8; background:#fff; color:#2d2d2d; font:500 14px Outfit,sans-serif; cursor:pointer; box-shadow:0 4px 10px rgba(0,0,0,.12); }
  .gdg-mobile-panel { display:none; }
  @media (max-width:1320px) { .gdg-auth { margin-left:12px; } }
  @media (max-width:1250px) {
    .gdg-header { padding-left:20px; padding-right:20px; }
    .gdg-nav-pill { padding:0 15px; }
    .gdg-main-nav { margin-left:20px; gap:5px; }
    .gdg-social-links { margin-left:16px; gap:14px; }
    .gdg-social { width:50px; }
    .gdg-auth { width:174px; padding-left:9px; font-size:14px; }
  }
  @media (max-width:900px) {
    .gdg-header { padding-left:14px; padding-right:14px; }
    .gdg-nav-pill { padding:0 10px; }
    .gdg-main-nav { margin-left:10px; gap:3px; }
    .gdg-main-link { font-size:12px; }
    .gdg-home-logo { width:40px; }
    .gdg-social-links { margin-left:10px; gap:9px; }
    .gdg-social { width:42px; }
    .gdg-auth { width:147px; padding-left:5px; font-size:12px; }
    .gdg-profile { width:28px; height:28px; }
  }
  @media (max-width:780px) {
    .gdg-header { padding-top:22px; }
    .gdg-nav-pill { flex:none; width:auto; min-width:74px; padding:0 15px; }
    .gdg-home-logo { width:47px; }
    .gdg-main-nav, .gdg-social-links, .gdg-auth { display:none; }
    .gdg-mobile-toggle { display:flex; }
    .gdg-mobile-panel { display:flex; flex-direction:column; gap:2px; margin-top:13px; padding:10px; background:#fff; border:1px solid #eee; border-radius:14px; box-shadow:0 8px 25px rgba(0,0,0,.12); }
    .gdg-mobile-link { padding:10px 12px; border-radius:8px; font:500 16px Outfit,sans-serif; text-decoration:none; color:#2d2d2d; }
    .gdg-mobile-link.active { background:#eaf2ff; color:#4285f4; }
    .gdg-mobile-note { padding:10px 12px; border-top:1px solid #eee; color:#767676; font-size:13px; }
  }
`;

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.7" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="25"
      height="25"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.8 5.1a18 18 0 0 0-4.4-1.4l-.5 1a16 16 0 0 0-5.8 0l-.5-1a18 18 0 0 0-4.4 1.4C1.4 9.2.6 13.3 1 17.4a18 18 0 0 0 5.5 2.8l1.2-1.9-1.8-.9.4-.3a13 13 0 0 0 11.4 0l.4.3-1.8.9 1.2 1.9a18 18 0 0 0 5.5-2.8c.5-4.8-.8-8.9-3.2-12.3ZM8.7 14.9c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.9.9 1.8 2c0 1.1-.8 2-1.8 2Zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.9.9 1.8 2c0 1.1-.8 2-1.8 2Z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <span className="gdg-profile" aria-hidden="true">
      <svg
        viewBox="0 0 32 32"
        width="31"
        height="31"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="16" cy="12" r="6" />
        <path d="M3.5 31a12.5 12.5 0 0 1 25 0Z" />
      </svg>
    </span>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { profile } = useDemoAccount();
  return (
    <header className="gdg-header">
      <style>{styles}</style>
      <div className="gdg-header-row">
        <div className="gdg-nav-pill">
          <NavLink
            to="/"
            aria-label="GDG home"
            className="gdg-home-link"
            onClick={() => setMenuOpen(false)}
          >
            <img src={gdgLogo} alt="GDG" className="gdg-home-logo" />
          </NavLink>
          <nav className="gdg-main-nav" aria-label="Main navigation">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `gdg-main-link${isActive ? " active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="gdg-social-links">
          <span
            className="gdg-social gdg-instagram"
            role="img"
            title="Instagram link not configured yet"
            aria-label="Instagram (coming soon)"
          >
            <InstagramIcon />
          </span>
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noreferrer"
            className="gdg-social gdg-discord"
            title="Join the GDG Discord"
            aria-label="Join the GDG Discord"
          >
            <DiscordIcon />
          </a>
        </div>
        <div className="gdg-auth">
          {profile ? (
            <NavLink
              to="/profile"
              className="flex min-w-0 items-center gap-2"
              aria-label="Open demo profile"
            >
              <span className="truncate">
                {profile.firstName} {profile.lastName}
              </span>
              <img
                src={profile.avatar || demoAvatar}
                width="31"
                height="31"
                className="rounded-full shrink-0"
                alt=""
              />
            </NavLink>
          ) : (
            <>
              <span>
                <NavLink to="/login" className="hover:text-[#4285f4]">
                  Log In
                </NavLink>
                &nbsp; | &nbsp;
                <NavLink to="/signup" className="hover:text-[#4285f4]">
                  Sign Up
                </NavLink>
              </span>
              <ProfileIcon />
            </>
          )}
        </div>
        <button
          type="button"
          className="gdg-mobile-toggle"
          aria-controls="gdg-mobile-panel"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
      {menuOpen && (
        <nav
          id="gdg-mobile-panel"
          className="gdg-mobile-panel"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `gdg-mobile-link${isActive ? " active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          {profile ? (
            <NavLink
              to="/profile"
              className="gdg-mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              My Profile (demo)
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/login"
                className="gdg-mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className="gdg-mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

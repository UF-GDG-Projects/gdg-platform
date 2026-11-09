import { Outlet, useLocation } from "react-router";
import loginShapes from "../assets/auth/login-shapes.svg";
import signupShapes from "../assets/auth/signup-shapes.svg";
import backgroundShapes from "../assets/events-background.svg";
import sitePattern from "../assets/site-pattern.svg";
import Navbar from "./Navbar";

export default function Layout() {
  const { pathname } = useLocation();
  const isAuth =
    pathname === "/login" ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/profile");
  // The Resources frame in Figma places its Shapes illustration lower than Events.
  const backgroundTop =
    pathname === "/resources" ? "top-[200px]" : "top-[42px]";

  return (
    <div
      className="relative isolate min-h-screen overflow-hidden bg-[#f5f5f5] font-sans text-[#2d2d2d]"
      style={
        isAuth
          ? undefined
          : {
              backgroundImage: `url(${sitePattern})`,
              backgroundRepeat: "repeat",
              backgroundSize: "250px 233px",
            }
      }
    >
      {isAuth ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden bg-[#f4f4f4]"
        >
          <img
            src={pathname !== "/login" ? signupShapes : loginShapes}
            alt=""
            style={{
              position: "absolute",
              maxWidth: "none",
              left: `calc(50% - ${pathname !== "/login" ? 971 : 974}px)`,
              top: pathname !== "/login" ? 124 : 163,
            }}
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center overflow-hidden"
        >
          <img
            src={backgroundShapes}
            alt=""
            className={`relative ${backgroundTop} w-[max(100vw,900px)] max-w-none shrink-0 select-none drop-shadow-[0_7px_6px_rgba(45,45,45,0.16)]`}
          />
        </div>
      )}
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}

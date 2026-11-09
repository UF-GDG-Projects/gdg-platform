import { Outlet, useLocation } from "react-router";
import backgroundShapes from "../assets/events-background.svg";
import Navbar from "./Navbar";

export default function Layout() {
  const { pathname } = useLocation();
  // The Resources frame in Figma places its Shapes illustration lower than Events.
  const backgroundTop =
    pathname === "/resources" ? "top-[200px]" : "top-[42px]";

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#fafafa] font-sans text-[#2d2d2d]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center overflow-hidden"
      >
        <img
          src={backgroundShapes}
          alt=""
          className={`relative ${backgroundTop} w-[1440px] max-w-none shrink-0 select-none`}
        />
      </div>
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}

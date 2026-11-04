import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { DemoAccountProvider } from "./demo/DemoAccount";
import Events from "./pages/Events";
import Login from "./pages/Login";
import PersonalInformation from "./pages/PersonalInformation";
import Placeholder from "./pages/Placeholder";
import Profile from "./pages/Profile";
import Resources from "./pages/Resources";

export default function App() {
  return (
    <DemoAccountProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Placeholder title="Home" />} />
            <Route path="events" element={<Events />} />
            <Route path="gallery" element={<Placeholder title="Gallery" />} />
            <Route path="officers" element={<Placeholder title="Officers" />} />
            <Route path="resources" element={<Resources />} />
            <Route path="login" element={<Login key="login" />} />
            <Route
              path="signup"
              element={<Login key="signup" mode="signup" />}
            />
            <Route path="signup/personal" element={<PersonalInformation />} />
            <Route path="profile" element={<Profile key="profile" />} />
            <Route
              path="profile/settings"
              element={<Profile key="settings" settingsPage />}
            />
            <Route path="faq" element={<Placeholder title="FAQ" />} />
            <Route path="*" element={<Placeholder title="Page not found" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DemoAccountProvider>
  );
}

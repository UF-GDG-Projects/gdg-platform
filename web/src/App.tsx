import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="gallery" element={<Placeholder title="Gallery" />} />
          <Route path="officers" element={<Placeholder title="Officers" />} />
          <Route path="resources" element={<Placeholder title="Resources" />} />
          <Route path="faq" element={<Placeholder title="FAQ" />} />
          <Route path="*" element={<Placeholder title="Page not found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

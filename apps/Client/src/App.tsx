import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Landing } from "./pages/Landing";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import SettingsComponent from "./components/Settings";
import ApiForm from "./components/ApiCreateForm";
import { ApiDetail } from "./components/Dashboard";
import { ApiList } from "./components/ApiList";
import DashboardLayoutBasic from "./Layout/DashboardLayout";
import IncidentPage from "./pages/Incident";
import Test from "./pages/Test";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route path="/dashboard" element={<Demo />} /> */}
          <Route path="/dash" element={< DashboardLayoutBasic />}>
            <Route index element={<ApiList />} />
            <Route path="test" element={<Test />} />
            <Route path="api/:api_id" element={<ApiDetail />} />
            <Route
              path="settings" 
              element={<SettingsComponent></SettingsComponent>}
            />
            <Route path="createMonitoring" element={<ApiForm />} />
            <Route path="incident" element={<IncidentPage />} />
          </Route>
          <Route path="/about" />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// src/App.jsx
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";

// Admin
import ADashboard from "./admin/pages/ADashboard";
import ManageUsers from "./admin/pages/ManageUsers";
import EventApproval from "./admin/pages/EventApproval";
import AdminSettings from "./admin/pages/AdminSettings";
// Volunteer
import VolunteerDashboard from "./volunteer/pages/VolunteerDashboard";

// Participant
import ParticipantSttings from "./participant/pages/ParticipantSttings";
import UploadVideo from "./participant/pages/UploadVideo";

// Organizer
import ODashboard from "./organizer/pages/ODashboard";
import ManageEvents from "./organizer/pages/ManageEvents";

// Other
import Events from "./pages/Events";
import Register from "./pages/Register";
import VolunteerRequest from "./volunteer/pages/VolunteerRequest";
import PublishResults from "./organizer/pages/PublishResults";
import Result from "./pages/Result";
import Gallery from "./pages/Gallery";
import Notifications from "./pages/Notifications";
import Auth from "./pages/Auth";
import PaymentSuccess from "./volunteer/pages/PaymentSuccess";
import PaymentFailed from "./volunteer/pages/PaymentFailed";
import OrganizerProfile from "./organizer/pages/OrganizerProfile";


function App() {
  return (
    
    <Routes>


      {/* Home */}
      <Route path="/" element={<Home />} />
     <Route path="/results" element={<Result />} />
<Route path="/gallery" element={<Gallery />} />
<Route path="/notifications" element={<Notifications />} />
<Route path="/auth" element={<Auth/>} />

     
      {/* Admin */}
      <Route path="/admin/dashboard" element={<ADashboard />} />
     <Route path="/admin/event-approval" element={<EventApproval />} />
  <Route path="/admin/manage-users" element={<ManageUsers />} />
   <Route path="/admin/settings" element={<AdminSettings />} />
      {/* Volunteer */}
      <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
          
      <Route path="/volunteer/request" element={<VolunteerRequest />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />

      {/* Participant */}
      <Route path="/participant" element={<ParticipantSttings />} />
      <Route path="/participant/upload" element={<UploadVideo />} />

      {/* Organizer */}
      <Route path="/organizer" element={<ODashboard />} />
      <Route path="/organizer/events" element={<ManageEvents />} />
      <Route path="/organizer/results" element={<PublishResults/>} />
<Route path="/organizer/settings" element={<OrganizerProfile />} />

      {/* Events */}
      <Route path="/events" element={<Events />} />
<Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;

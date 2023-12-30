import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import WaitingList from "./pages/WaitingList";
import VerificationWhatsapp from "./pages/VerificationWhatsapp";
import Spinner from "./components/Spinner";
import Congratulation from "./pages/Congratulation";
import CredentialStart from "./pages/CredentialStart";
import CredentialEnd from "./pages/CredentialEnd";
import WorkPermitStep from "./pages/ressources/WorkPermitStep";
import ScholarshipProgramCA from "./pages/ressources/ScholarshipProgramCA";
import ScholarshipProgramFR from "./pages/ressources/ScholarshipProgramFR";
import ImmigrateToCanada from "./pages/ressources/ImmigrateToCanada";
import StudyInFrance from "./pages/ressources/StudyInFrance";
import WendogoMission from "./pages/ressources/WendogoMission";
import WendogoCost from "./pages/ressources/WendogoCost";
import WendogoPrivacy from "./pages/ressources/WendogoPrivacy";
import AboutUs from "./pages/ressources/AboutUs";
import Contact from "./pages/Contact";
import LegalNotice from "./pages/LegalNotice";
import CGU from "./pages/CGU";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div>
      <Routes>

        <Route path="*" element={<NotFound/>} />
        <Route exact path="/" element={<Home/>} />
        <Route path="/waitinglist" element={<WaitingList/>} />
        <Route path="/verification" element={<VerificationWhatsapp/>} />
        <Route path="/congratulation" element={<Congratulation/>} />
        <Route path="/credentialstart" element={<CredentialStart/>} />
        <Route path="/credentialend" element={<CredentialEnd/>} />
        <Route path="/work-permit-steps" element={<WorkPermitStep/>} />
        <Route path="/scholarship-program-canada" element={<ScholarshipProgramCA/>} />
        <Route path="/scholarship-program-france" element={<ScholarshipProgramFR/>} />
        <Route path="/immigrate-to-canada" element={<ImmigrateToCanada/>} />
        <Route path="/study-in-france" element={<StudyInFrance/>} />
        <Route path="/wendogo-mission" element={<WendogoMission/>} />
        <Route path="/wendogo-cost" element={<WendogoCost/>} />
        <Route path="/wendogo-privacy" element={<WendogoPrivacy/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/legal-notice" element={<LegalNotice/>} />
        <Route path="/cgu" element={<CGU/>} />
      </Routes>
      <Spinner/>
    </div>
  );
};
export default App;

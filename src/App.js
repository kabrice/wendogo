import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import WaitingList from "./pages/WaitingList";
import VerificationWhatsapp from "./pages/VerificationWhatsapp";
import Spinner from "./components/Spinner";
import Congratulation from "./pages/Congratulation";
import CredentialStart from "./pages/CredentialStart";
import CredentialEnd from "./pages/CredentialEnd";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/waitinglist" element={<WaitingList/>} />
        <Route path="/verification" element={<VerificationWhatsapp/>} />
        <Route path="/congratulation" element={<Congratulation/>} />
        <Route path="/congratulation" element={<Congratulation/>} />
        <Route path="/credentialstart" element={<CredentialStart/>} />
        <Route path="/credentialend" element={<CredentialEnd/>} />
      </Routes>
      <Spinner/>
    </div>
  );
};
export default App;

import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import WaitingList from "./pages/WaitingList";
import VerificationWhatsapp from "./pages/VerificationWhatsapp";
import Spinner from "./components/Spinner";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/waitinglist" element={<WaitingList/>} />
        <Route path="/verification" element={<VerificationWhatsapp/>} />
      </Routes>
      <Spinner/>
    </div>
  );
};
export default App;

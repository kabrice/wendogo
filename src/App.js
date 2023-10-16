import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import WaitingList from "./pages/WaitingList";
const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/waitinglist" element={<WaitingList/>} />
      </Routes>
    </div>
  );
};
export default App;

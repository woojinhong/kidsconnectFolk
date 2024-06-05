import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@mantine/core/styles.css";

import Index from "./Pages/Index/Index";
import MypageTherapist from "./Pages/Mypage/MypageTherapist";
import TherapistIntroduction from "./Pages/TherapistIntroduction/TherapistIntroduction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/mypage/t" element={<MypageTherapist />} />
        <Route path="/therapist/:id" element={<TherapistIntroduction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

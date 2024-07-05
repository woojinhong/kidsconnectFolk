import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import DefaultLayout from "./Component/Layout/DefaultLayout";
import Index from "./Pages/Index/Index";
import MypageTherapist from "./Pages/Mypage/MypageTherapist";
import MypageParents from "./Pages/Mypage/MypageParents";
import TherapistIntroduction from "./Pages/TherapistIntroduction/TherapistIntroduction";
import Signin from "./Pages/Membership/Signin/Signin";
import Signup from "./Pages/Membership/Signup/Signup";
import FindMatching from "./Pages/FindMatching/FindMatching";
import CreateIntroduction from "./Pages/CreateIntroduction/CreateIntroduction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/matching" element={<FindMatching />} />
        </Route>
        <Route element={<DefaultLayout bgColor="lightGray" />}>
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage/t" element={<MypageTherapist />} />
          <Route path="/mypage/p" element={<MypageParents />} />
          <Route path="/create" element={<CreateIntroduction />} />
          <Route path="/therapist/:id" element={<TherapistIntroduction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

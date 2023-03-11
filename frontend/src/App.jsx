import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MobileHeader from "./components/MobileHeader";
import MobileNav from "./components/MobileNav";
import Sidebar from "./components/Sidebar";
import Error from "./pages/Error";
import Home from "./pages/Home";
import VideoDetails from "./pages/VideoDetails";

function App() {
  return (
    <div className=" sm:flex sm:flex-row bg-[#F2F2F2] w-full sm:h-[100vh] sm:w-full md:w-10/12 mx-auto overflow-hidden ">
      <div className="sm:hidden block bg-[#F8FAFC]">
        <MobileHeader />
      </div>
      <div className=" bg-slate-50 sm:hidden block fixed bottom-0 left-0 right-0">
        <MobileNav />
      </div>
      <div className="sm:w-[300px] hidden sm:block ">
        <Sidebar />
      </div>
      <div className=" p-5 w-full overflow-y-auto">
        <div className="hidden sm:block sticky">
          <Header />
        </div>
        <div className="overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/videos/:id" element={<VideoDetails />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

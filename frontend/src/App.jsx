import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Error from "./pages/Error";
import Home from "./pages/Home";
import VideoDetails from "./pages/VideoDetails";

function App() {
  return (
    <div className=" sm:flex sm:flex-row bg-[#F2F2F2] w-full sm:h-[100vh] sm:w-full md:w-10/12 mx-auto overflow-hidden ">
      <div className="w-[300px] ">
        <Sidebar />
      </div>
      <div className=" p-5 w-full overflow-y-auto">
        <div className="sticky">
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

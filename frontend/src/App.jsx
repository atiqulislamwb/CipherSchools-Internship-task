import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Error from "./pages/Error";
import Home from "./pages/Home";
import VideoDetails from "./pages/VideoDetails";

function App() {
  return (
    <div className=" sm:flex sm:flex-row bg-[#F2F2F2] w-full sm:w-full md:w-10/12 mx-auto overflow-hidden ">
      <div className="w-[300px] ">
        <Sidebar />
      </div>
      <div className="overflow-y-auto p-5 w-full">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos/:id" element={<VideoDetails />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

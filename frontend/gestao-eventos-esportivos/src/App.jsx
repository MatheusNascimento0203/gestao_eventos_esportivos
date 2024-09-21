import { RouterProvider } from "react-router-dom";
import Inputs from "./Components/Inputs";
import Login from "./Pages/Login";
import router from "./routers/routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;

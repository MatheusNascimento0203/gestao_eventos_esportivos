import { createBrowserRouter, useNavigate } from "react-router-dom";
import RootLayout from "../Components/RootLayout";
import Login from "../Pages/Login";
import CreateUser from "../Pages/CreateUser";
import Home from "../Pages/Home";
import CreateEvento from "../Pages/CreateEvento";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "cadastrarUsuario",
        element: <CreateUser />,
      },
      {
        path: "home",
        element: <Home />,
        children: [
          {
            path: "cadastrarEvento",
            element: <CreateEvento />,
          },
        ],
      },
    ],
  },
]);

export default router;

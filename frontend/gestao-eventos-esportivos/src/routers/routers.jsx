import { createBrowserRouter, useNavigate } from "react-router-dom";
import RootLayout from "../Components/RootLayout";
import Login from "../Pages/user/Login";
import CreateUser from "../Pages/user/CreateUser";
import Home from "../Pages/Home";
import CreateEvento from "../Pages/eventos/CreateEvento";
import SearchEquipe from "../Pages/Equipes/SearchEquipe";
import SearchEvento from "../Pages/Eventos/SearchEvento";
import CreateEquipe from "../Pages/Equipes/CreateEquipe";
import SearchAtleta from "../Pages/Atletas/SearchAtleta";
import CreateAtleta from "../Pages/Atletas/CreateAtleta";

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
                        path: "searchEvento",
                        element: <SearchEvento />,
                    },
                    {
                        path: "createEvento",
                        element: <CreateEvento />,
                    },
                    {
                        path: "searchEquipe",
                        element: <SearchEquipe />,
                    },
                    {
                        path: "createEquipe",
                        element: <CreateEquipe />,
                    },
                    {
                        path: "searchAtleta",
                        element: <SearchAtleta />,
                    },
                    {
                        path: "createAtleta",
                        element: <CreateAtleta />,
                    },
                ],
            },
        ],
    },
]);

export default router;

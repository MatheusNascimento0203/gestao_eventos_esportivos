import { Outlet, useLocation } from "react-router-dom";
import Navegation from "../Components/Navegation";
import handleRedirect from "../hooks/handleRedirect";
import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Grafico from "./graficos/grafico";

export default () => {
    const location = useLocation();
    const isHome = location.pathname === "/home";
    const token = localStorage.getItem("token");
    const { redirectTo } = handleRedirect();

    useEffect(() => {
        if (!token) {
            redirectTo("/");
        }
    }, [token, redirectTo]);

    return (
        <div>
            <Navegation />
            {isHome && <Grafico />}
            <Outlet />
        </div>
    );
};

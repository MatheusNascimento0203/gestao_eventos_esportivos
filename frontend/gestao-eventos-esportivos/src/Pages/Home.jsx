import { Outlet, useLocation } from "react-router-dom";
import Navegation from "../Components/Navegation";
import handleRedirect from "../hooks/handleRedirect";
import { useEffect } from "react";

export default () => {
  const location = useLocation();
  const isHome = location.pathname === "/home";
  const token = localStorage.getItem("token");
  const { redirectTo } = handleRedirect();

  useEffect(() => {
    if (!token) {
      redirectTo("/");
    }
  }, []);

  return (
    <div>
      <Navegation />
      {isHome && <h2>OI</h2>}
      <Outlet />
    </div>
  );
};

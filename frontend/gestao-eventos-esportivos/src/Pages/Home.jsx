import { Outlet } from "react-router-dom";
import Navegation from "../Components/Navegation";

export default () => {
  return (
    <div>
      <Navegation />
      <Outlet />
    </div>
  );
};

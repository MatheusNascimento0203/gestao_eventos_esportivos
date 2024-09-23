import { useEffect } from "react";
import GridResultado from "../Components/GridResultado";
import Navegation from "../Components/Navegation";
import handleRedirect from "../hooks/handleRedirect";

export default () => {
  // const token = localStorage.getItem("token");
  // const { redirectTo } = handleRedirect();

  // useEffect(() => {
  //   if (!token) {
  //     redirectTo("/");
  //   }
  // }, []);

  return (
    <div>
      <GridResultado />
    </div>
  );
};

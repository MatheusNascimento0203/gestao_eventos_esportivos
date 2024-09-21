import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const redirectTo = (path) => {
    navigate(path);
  };
  return { redirectTo };
};

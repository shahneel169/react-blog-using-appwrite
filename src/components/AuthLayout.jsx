import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, isAuthRequired = true }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = useSelector((state) => state.auth.isUserLoggedin);

  useEffect(() => {
    setIsLoading(true);
    if (isAuthRequired && !isAuthenticated) navigate("/login");
    else if (!isAuthRequired && isAuthenticated) navigate("/");

    setIsLoading(false);
  }, [isAuthenticated, isAuthRequired]);

  return isLoading ? <h1>Loading...</h1> : <>{children}</>;
};

export default Protected;

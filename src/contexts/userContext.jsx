// dependencies
import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userAccount, setUserAccount] = useState({
    logged: Boolean(localStorage.getItem("username")),
    username: localStorage.getItem("username") || "",
  });

  return (
    <UserContext.Provider value={{ userAccount, setUserAccount }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

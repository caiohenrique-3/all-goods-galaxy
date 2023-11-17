// dependencies
import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userAccount, setUserAccount] = useState({
    logged: false,
    username: "test",
  });

  return (
    <UserContext.Provider value={{ userAccount, setUserAccount }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

// dependencies
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

// User account can be either from fakestoreapi or
// a registred account that gets saved in localStorage
const UserProvider = ({ children }) => {
  const [userAccount, setUserAccount] = useState({
    logged: Boolean(localStorage.getItem("username")),
    id: -1,
    email: localStorage.getItem("email") || "",
    username: localStorage.getItem("username") || "",
    name: {
      firstName: localStorage.getItem("firstName") || "",
      lastName: localStorage.getItem("lastName") || "",
    },
    address: {
      city: localStorage.getItem("city") || "",
      street: localStorage.getItem("street") || "",
      number: localStorage.getItem("number") || -1,
      zipcode: localStorage.getItem("zipcode") || "",
    },
    phone: localStorage.getItem("phone") || "",
    cartItems: JSON.parse(localStorage.getItem("cartItems")) ||
      { productIds: [] },
  });

  // fetching data from fakestoreapi
  async function fetchData() {
    if (userAccount.logged) {
      try {
        const response = await fetch("https://fakestoreapi.com/users");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        const foundUser = json.find((user) =>
          user.username === userAccount.username
        );

        // If found, that means the user is from fakestoreapi
        if (foundUser) {
          setUserAccount((prevUserAccount) => ({
            ...prevUserAccount,
            id: foundUser.id,
            email: foundUser.email,
            name: {
              firstName: foundUser.name.firstname,
              lastName: foundUser.name.lastname,
            },
            address: {
              city: foundUser.address.city,
              street: foundUser.address.street,
              number: foundUser.address.number,
              zipcode: foundUser.address.zipcode,
            },
            phone: foundUser.phone,
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [userAccount.logged, userAccount.username]);

  return (
    <UserContext.Provider value={{ userAccount, setUserAccount }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

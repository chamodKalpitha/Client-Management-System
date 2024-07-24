import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_JWT } from "../src/queries/userQueries";
import { GET_CLIENTS } from "../src/queries/clientQueries";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const { loading, error, data } = useQuery(GET_USER_JWT);
  useEffect(() => {
    if (!user) {
      if (!loading && !error && data) {
        setUser(data);
      }
    }
  }, []);
  return (
    <UserContext.Provider value={(user, setUser)}>
      {children}
    </UserContext.Provider>
  );
}

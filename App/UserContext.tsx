import { useContext } from "react";
import { createContext } from "react";

export const UserContext = createContext({
  currentUser: "noUser",
  setCurrentUser: (e: any) => {},
});

export const useUserContext = () => useContext(UserContext);

// Arquivo contextoGlobal.tsx
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { UserTypes } from "@/types/UserType";

interface GlobalContextProps {
  user: UserTypes | null;
  setUser: React.Dispatch<React.SetStateAction<UserTypes | null>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserTypes | null>(null);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext deve ser usado dentro de um GlobalProvider"
    );
  }
  return context;
};

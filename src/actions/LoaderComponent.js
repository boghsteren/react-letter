import React, { useState, createContext } from "react";

export const LoaderContext = createContext();

export const LoaderComponent = ({ children }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <LoaderContext.Provider value={{ loading, setLoading }}>
        {children}
      </LoaderContext.Provider>
    </div>
  );
};

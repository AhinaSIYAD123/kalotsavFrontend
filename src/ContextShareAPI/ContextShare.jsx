import React, { createContext, useState } from "react";


export const searchContext = createContext("");

function ContextShare({ children }) {
  
  const [searchKey, setSearchKey] = useState(""); 

  return (
    <searchContext.Provider value={{ searchKey, setSearchKey }}>
      {children}
    </searchContext.Provider>
  );
}

export default ContextShare;

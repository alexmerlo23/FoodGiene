import React, { createContext, useState } from 'react';

export const IngredientsContext = createContext();

export const IngredientsProvider = ({ children }) => {
  const [savedIngredients, setSavedIngredients] = useState([]);

  return (
    <IngredientsContext.Provider value={{ savedIngredients, setSavedIngredients }}>
      {children}
    </IngredientsContext.Provider>
  );
};

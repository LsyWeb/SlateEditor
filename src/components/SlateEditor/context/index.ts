import React from "react";

export type StateContextType = {
  link: {
    href: string;
    linkText: string;
  };

  setLink: (link: { href: string; linkText: string }) => void;
};

export const StateContext = React.createContext<StateContextType>({
  link: {
    href: "",
    linkText: "",
  },
  setLink: () => {},
});

export const StateProvider = StateContext.Provider;

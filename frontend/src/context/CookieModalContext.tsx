import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type CookieModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CookieModalContext = createContext<CookieModalContextValue | undefined>(
  undefined
);

export const CookieModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <CookieModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </CookieModalContext.Provider>
  );
};

export const useCookieModal = () => {
  const ctx = useContext(CookieModalContext);
  if (!ctx) throw new Error("useCookieModal must be used within CookieModalProvider");
  return ctx;
};

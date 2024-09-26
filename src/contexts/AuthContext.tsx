import React, { createContext, useState, ReactNode } from "react";

interface IAuthContext {
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    isAdmin: boolean;
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContext>({
    isAuth: false,
    setIsAuth: () => {
        throw new Error("Function not implemented.");
    },
    isAdmin: false,
    setIsAdmin: () => {
        throw new Error("Function not implemented.");
    },
});

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

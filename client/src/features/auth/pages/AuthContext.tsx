import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthUser, LoginInput } from "./type";
import { loginUser, logoutUser, getCurrentUser } from "../api";

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    login: (input: LoginInput) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser().then(user => {
            if (user) setUser(user);
            setIsLoading(false);
        });
    }, []);

    const login = async (input: LoginInput) => {
        const authUser = await loginUser(input);
        setUser(authUser);
    };

    const logout = () => {
        logoutUser();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};

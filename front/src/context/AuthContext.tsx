'use client';
import { IUserSession } from "@/types/types";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

export interface IAuthContextProps {
    userData: IUserSession | null;
    setUserData: (userdata: IUserSession | null) => void;
    handleLogout: () => void;
}

export const AuthContext = createContext<IAuthContextProps>({
    userData: null,
    setUserData: () => {},
    handleLogout: () => {}
});

export interface IAuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
    const router = useRouter();
    const [userData, setUserData] = useState<IUserSession | null>(null);
    useEffect(() => {
        if(userData) {
            localStorage.setItem('userSession', JSON.stringify({token: userData.token, user: userData.user}));
            Cookies.set('userSession', JSON.stringify({token: userData.token, user: userData.user}));
        }
    }, [userData])
    
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userSession')!)
        setUserData(userData)
    }, [])

    const handleLogout = () => {
        router.push('/');
        alert('Usuario deslogueado correctamente');
        localStorage.removeItem('userSession');
        setUserData(null);
        Cookies.remove('userSession');
    }

    return (
        <AuthContext.Provider value={{userData, setUserData, handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 

import React, {useContext, useEffect, useState} from "react";

export const UserContext = React.createContext();
export const AuthContext = React.createContext();
let instance;


export const getAuth = () => {
    return instance;
}

export const AuthProvider = ({ children, auth }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(setCurrentUser);
        instance = auth;
    }, [auth])

    return (
        <AuthContext.Provider value={auth}>
            <UserContext.Provider value={{currentUser}}>
                {children}
            </UserContext.Provider>
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const auth = useContext(AuthContext);
    const {currentUser} = useContext(UserContext);
    return {auth, currentUser}
}




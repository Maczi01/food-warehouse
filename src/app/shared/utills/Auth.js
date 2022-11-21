import React, {useContext, useEffect, useState} from "react";

export const UserContext = React.createContext();
export const AuthContext = React.createContext();
export const DBContext = React.createContext();

export const AuthProvider = ({children, auth, db}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <DBContext.Provider value={db}>
            <AuthContext.Provider value={auth}>
                <UserContext.Provider value={{currentUser}}>
                    {children}
                </UserContext.Provider>
            </AuthContext.Provider>
        </DBContext.Provider>
    );
};

export const useAuth = () => {
    const auth = useContext(AuthContext);
    const {currentUser} = useContext(UserContext);
    const db = useContext(DBContext);
    return {auth, currentUser, db}
}




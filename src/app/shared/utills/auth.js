import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);
export const AuthContext = createContext(null);
let instance;

export const getAuth = () => {
  return instance;
};

export const AuthProvider = ({ children, auth }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
    instance = auth;
  }, [auth]);

  return (
    <AuthContext.Provider value={auth}>
      <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
  auth: PropTypes.object,
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  const { currentUser } = useContext(UserContext);
  return { auth, currentUser };
};

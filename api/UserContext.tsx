import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext({}); // {} 객체형태

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState([]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useUserState = () => useContext(UserContext);

export { useUserState };

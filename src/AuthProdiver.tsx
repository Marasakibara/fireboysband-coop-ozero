import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth();
type childrenType = {
  children: JSX.Element;
};
const AuthProvider = ({ children }: childrenType) => {
  const [isAuth, setIsAuth] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setIsAuth(true);
      console.log(isAuth, 'app.tsx');
    } else {
      setIsAuth(false);
      // User is signed out
      // ...
    }
  });
  return (
    <>
      <AuthContext.Provider value={{ auth, isAuth }}>{children}</AuthContext.Provider>
    </>
  );
};
export default AuthProvider;

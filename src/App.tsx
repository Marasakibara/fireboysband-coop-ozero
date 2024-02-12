import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from './Pages/AuthPage';
import HomePage from './Pages/HomePage';
import AuthPage from './Pages/AuthPage';
import { AuthContext } from './AuthContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';

const auth = getAuth();

function App() {
  const [isAuth, setIsAuth] = React.useState(false);
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
      <AuthContext.Provider
        value={{
          auth,
          isAuth,
        }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<AuthPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;

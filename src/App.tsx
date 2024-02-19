import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AuthPage from './Pages/AuthPage';
import AuthProvider from './AuthProdiver';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<AuthPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

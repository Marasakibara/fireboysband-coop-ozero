import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from './Pages/AuthPage';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/auth" element={<RegistrationPage />} />
      </Routes>
    </>
  );
}

export default App;

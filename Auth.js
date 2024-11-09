import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Login from './Login';
import Register from './Register';

const Auth = ({ setIsLoggedIn, setUsername }) => {
  const [showLogin, setShowLogin] = useState(true);
  const { login, register } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      setIsLoggedIn(true);
      setUsername(email);
      setErrorMessage(''); // Clear any previous error
    } else {
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async (email, password) => {
    setLoading(true);
    const success = await register(email, password);
    setLoading(false);
    if (success) {
      setIsLoggedIn(true);
      setUsername(email);
      setErrorMessage(''); // Clear any previous error
    } else {
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {showLogin ? (
        <Login onLogin={handleLogin} loading={loading} />
      ) : (
        <Register onRegister={handleRegister} loading={loading} />
      )}
      <button onClick={toggleForm}>
        {showLogin ? 'Go to Register' : 'Go to Login'}
      </button>
    </div>
  );
};

export default Auth;

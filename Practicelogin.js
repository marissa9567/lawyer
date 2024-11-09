import React, { useState } from 'react';
import { auth } from '../components/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ setIsLoggedIn, setUsername }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true while attempting login
    setError('');  // Reset any previous error messages

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      setUsername(email);
    } catch (error) {
      console.error('Error logging in: ', error);
      setError('Failed to log in. Please check your email and password.'); // Display error message
    } finally {
      setLoading(false);  // Set loading to false after attempting login
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required // Make the email field required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // Make the password field required
        />
        <button type="submit" disabled={loading}> {/* Disable button while loading */}
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message if present */}
    </div>
  );
};

export default Login;

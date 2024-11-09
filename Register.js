import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Register = ({ setIsLoggedIn, setUsername }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State for messages
  const [isError, setIsError] = useState(false); // State for error flag

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
      setIsLoggedIn(true);
      setUsername(email);
      setMessage('Registration successful!'); // Set success message
      setIsError(false); // Reset error flag
    } catch (error) {
      console.error('Error registering:', error.message);
      setMessage(error.message); // Set error message
      setIsError(true); // Set error flag
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {message && (
        <p style={{ color: isError ? 'red' : 'green' }}>{message}</p> // Display message
      )}
    </div>
  );
};

export default Register;

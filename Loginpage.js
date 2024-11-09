import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/firebase'; // Adjust import according to your project structure
import "../styles/Loggedin.css";
const Loginpage = ({ setIsLoggedIn, setUsername,isLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      setUsername(userCredential.user.email);
      
      // Redirect to the shop editing page after successful login
      navigate('/edit'); // Change to your specific edit route for the shop
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <h1 className='log'>User is {isLoggedIn ? 'Logged In' : 'Logged Out'}</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Loginpage;

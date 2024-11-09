import React, { useState } from 'react';
import { auth } from '../components/firebase';  // Import Firebase auth instance

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          // Logged in
        })
        .catch(error => console.error(error));
    } else {
      auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          // Signed up
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
      </p>
    </form>
  );
};

export default AuthForm;

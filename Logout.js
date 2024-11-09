// Logout.js
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

const Logout = () => {
  const handleLogout = () => {
    signOut(auth).then(() => {
      window.location.href = '/login';
    });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

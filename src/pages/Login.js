import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './style.css'
import Navbar from '../componants/Navbar';
import Footer from '../componants/Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        setError('No user profile found.');
        return;
      }

      const userData = userDocSnap.data();

      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <Navbar />
    <div className='full-page'>
      <h1>Welcome to Caterpie-dev</h1>
        <div className='login-form'>
        <h2>Login</h2>
        <form onSubmit={login}>
            <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
        <p
            onClick={() => navigate("/Signup")}
            style={{ cursor: "pointer", color: "blue" }}
        >
            Don't have an account? Sign up
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </div></div>
        <Footer />
    </>
  )
}

export default Login
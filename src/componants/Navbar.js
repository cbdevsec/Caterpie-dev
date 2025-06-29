import React, { useState, useEffect } from 'react'
import './navbar.css'
import {AiFillBug, AiFillHome} from 'react-icons/ai'
import {BiExit} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <nav className='navbar'>
      <div className='bug-nav-icon'>
        <Link to='/dashboard' className='Home'><h3><AiFillBug /></h3></Link>
      </div>
      <div className='nav-links'>
        <Link to='/Login' className='Home'><h3><AiFillHome/></h3></Link>
      
      {user && (
        <button onClick={handleLogout} className='logout-button' ><BiExit/></button>
      )}
      </div>
    </nav>
  )
}

export default Navbar
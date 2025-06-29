import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebase';
import './style.css'
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../componants/Navbar';
import Footer from '../componants/Footer';
import { useNavigate } from 'react-router-dom';

function BugDash() {
  const [user, setUser] = useState(null);
  const [bugs, setBugs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  useEffect(() => {
    const q = query(collection(db, 'bugs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bugList = [];
      querySnapshot.forEach((doc) => {
        bugList.push({ id: doc.id, ...doc.data() });
      });
      setBugs(bugList);
    });
    return () => unsubscribe();
  }, []);

  const validateForm = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || !user) return;

    try {
      await addDoc(collection(db, 'bugs'), {
        ...formData,
        createdAt: serverTimestamp(),
        createdBy: user.Name || user.email
      });
      setFormData({ title: '', description: '', priority: 'Medium' });
      setError('');
    } catch (err) {
      setError('Failed to submit bug.');
    }
  };


  return (
    <>
    <Navbar />
    <div className="full-page">
      <h1 className="text-3xl font-bold mb-4">🐞 Bug Dashboard</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <input
          type="text"
          placeholder="Bug title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Bug description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="border p-2 w-full mb-2"
        ></textarea>
        <select
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          className="border p-2 w-full mb-2"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Bug
        </button>
      </form>

      <div className="bg-gray-50 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Submitted Bugs</h2>
        {bugs.map((bug) => (
          <div key={bug.id} className="border-b py-2">
            <h3 className="font-bold">{bug.title} <span className="text-sm text-gray-500">({bug.priority})</span></h3>
            <p className="text-sm">{bug.description}</p>
            <p className="text-xs text-gray-500">Submitted by {bug.createdBy} at {bug.createdAt?.toDate().toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  )
}

export default BugDash
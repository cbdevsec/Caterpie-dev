import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import './style.css'
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Role, setRole] = useState("");

    const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      await setDoc(doc(db, "users", uid), {
        uid,
        email,
        Name,
        Role,
        createdAt: new Date()
      });

      alert("Signup successful!");
    } catch (err) {
      alert("Signup error: " + err.message);
    }
  };

  return (
    <>
    <Navbar />
    <div className="full-page">
        <form onSubmit={handleSignup} className="form-inputs">
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="Role"
            placeholder="Role"
            value={Role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default Signup
import React, { useState } from "react";
import { post } from "../api";

export function Login({ onClose }) {
  const [email, setEmail] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    alert("Logged in as: " + email);
    onClose();
  }

  return (
    <div style={{ padding: 20 }}>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
        />
        <br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export function Signup({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    const res = await post("/users/register", { name, email, companyName: company });
    if (res.error) alert("Error: " + res.error);
    else alert("Registered user: " + res.user.name);
    onClose();
  }

  return (
    <div style={{ padding: 20 }}>
      <h3>Sign Up</h3>
      <form onSubmit={handleSignup}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={e=>setName(e.target.value)} 
        /><br/>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
        /><br/>
        <input 
          type="text" 
          placeholder="Company" 
          value={company} 
          onChange={e=>setCompany(e.target.value)} 
        /><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

import React from "react";

export default function Navbar({ onShowLogin, onShowSignup }) {
  return (
    <nav style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "10px 20px", 
      backgroundColor: "#282c34", 
      color: "#fff" 
    }}>
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>
        Expense Management
      </div>
      <div style={{ display: "flex", gap: "15px" }}>
        <button 
          onClick={onShowLogin} 
          style={{ background: "transparent", border: "1px solid #fff", color: "#fff", padding: "6px 12px", borderRadius: "5px", cursor: "pointer" }}
        >
          Login
        </button>
        <button 
          onClick={onShowSignup} 
          style={{ background: "#61dafb", border: "none", padding: "6px 12px", borderRadius: "5px", cursor: "pointer" }}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}

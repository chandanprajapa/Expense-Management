import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SubmitExpense from "./pages/SubmitExpense";
import ExpensesList from "./pages/ExpensesList";
import { Login, Signup } from "./pages/Auth";

export default function App(){
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div>
      <Navbar 
        onShowLogin={() => setShowLogin(true)} 
        onShowSignup={() => setShowSignup(true)} 
      />

      <div style={{ padding: 20 }}>
        {showLogin && <Login onClose={() => setShowLogin(false)} />}
        {showSignup && <Signup onClose={() => setShowSignup(false)} />}

        <hr/>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex:1 }}>
            <SubmitExpense />
          </div>
          <div style={{ flex:1 }}>
            <ExpensesList />
          </div>
        </div>
      </div>
    </div>
  );
}

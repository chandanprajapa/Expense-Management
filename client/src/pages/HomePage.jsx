// HomePage.jsx
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black  to-pink-600 flex flex-col items-center justify-center text-white px-6">
      {/* Heading */}
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
        Welcome to Expense Tracker 💰
      </h1>

      {/* Subheading */}
      <p className="text-lg max-w-2xl text-center mb-8">
        Track your income, expenses, and savings with ease.  
        Sign in to start managing your finances smarter and faster.
      </p>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        {/* Show login if signed out */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow-md hover:bg-gray-200 transition">
              Get Started
            </button>
          </SignInButton>
        </SignedOut>

        {/* Show user + logout if signed in */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <span className="text-lg font-medium">You’re signed in 🎉</span>
        </SignedIn>
      </div>
    </div>
  );
};

export default HomePage;

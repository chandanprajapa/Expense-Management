// Navbar.jsx
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold">MyApp</div>

      {/* Links */}
      <div className="flex items-center gap-6">
        <a href="/" className="hover:text-gray-300">Home</a>
        <a href="/about" className="hover:text-gray-300">About</a>
        
        {/* Show login if signed out */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
              Login
            </button>
          </SignInButton>
        </SignedOut>

        {/* Show user + logout if signed in */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;

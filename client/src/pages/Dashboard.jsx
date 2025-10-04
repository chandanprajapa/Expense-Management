// Dashboard.jsx
import { useUser } from "@clerk/clerk-react";

const Dashboard = () => {
  const { user } = useUser();

  // Example static data (later you can fetch from DB)
  const income = 5000;
  const expenses = 3200;
  const balance = income - expenses;

  const transactions = [
    { id: 1, title: "Grocery Shopping", amount: -150, date: "Oct 1" },
    { id: 2, title: "Salary", amount: +5000, date: "Oct 1" },
    { id: 3, title: "Netflix Subscription", amount: -15, date: "Oct 2" },
    { id: 4, title: "Restaurant", amount: -40, date: "Oct 3" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* Greeting */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome back, <span className="text-indigo-600">{user?.firstName}</span> 👋
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-600">Balance</h2>
          <p className="text-2xl font-bold text-green-600">${balance}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-600">Income</h2>
          <p className="text-2xl font-bold text-blue-600">${income}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-600">Expenses</h2>
          <p className="text-2xl font-bold text-red-600">${expenses}</p>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
        <ul className="space-y-3">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="flex justify-between items-center border-b pb-2 last:border-none"
            >
              <div>
                <p className="font-medium text-gray-700">{tx.title}</p>
                <p className="text-sm text-gray-500">{tx.date}</p>
              </div>
              <span
                className={`font-semibold ${
                  tx.amount < 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {tx.amount < 0 ? `- $${Math.abs(tx.amount)}` : `+ $${tx.amount}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

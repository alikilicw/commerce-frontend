import React from "react";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 flex flex-col h-screen w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-xl font-semibold">My Sidebar</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-2">
            <a href="#" className="block p-2 rounded hover:bg-gray-700">
              Dashboard
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block p-2 rounded hover:bg-gray-700">
              Profile
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block p-2 rounded hover:bg-gray-700">
              Settings
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block p-2 rounded hover:bg-gray-700">
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

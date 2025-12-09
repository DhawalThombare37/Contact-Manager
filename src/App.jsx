import React from "react";
import ContactManager from "./components/ContactManager";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">📇 Contact Manager</h1>
      <ContactManager />
    </div>
  );
}

export default App;


import React, { useState, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { PieChart, Pie, Tooltip, Legend, Cell, BarChart, Bar, XAxis, YAxis } from "recharts";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [categories, setCategories] = useState(["Friends", "Family", "Work"]);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    location: "",
    website: "",
    category: "",
    priority: "Medium",
  });
  const [newCategory, setNewCategory] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [editingContactIndex, setEditingContactIndex] = useState(null);
  const [modalContact, setModalContact] = useState(null);

  const priorityOrder = ["High", "Medium", "Low"];
  const priorityColors = {
    High: "#EF4444",
    Medium: "#F59E0B",
    Low: "#10B981",
  };

  const priorityCounts = priorityOrder.map((p) => ({
    name: p,
    value: contacts.filter((c) => c.priority === p).length,
  }));

  const categoryCounts = categories.map((cat) => ({
    name: cat,
    value: contacts.filter((c) => c.category === cat).length,
  }));

  const updateDiagram = () => {
    const newNodes = [];
    const newEdges = [];

    const catWidth = 300;
    const cardHeight = 150;

    categories.forEach((cat, i) => {
      const catX = i * catWidth;
      const catY = 50;

      newNodes.push({
        id: `cat-${cat}`,
        type: "input",
        data: { label: cat },
        position: { x: catX, y: catY },
        style: {
          background: darkMode ? "#1F2937" : "#E5E7EB",
          color: darkMode ? "#F9FAFB" : "#111827",
          border: "2px solid #4B5563",
          borderRadius: 8,
          padding: 10,
          fontWeight: "bold",
        },
        draggable: false,
      });

      const catContacts = contacts
        .filter((c) => c.category === cat)
        .filter((c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort(
          (a, b) =>
            priorityOrder.indexOf(a.priority) -
            priorityOrder.indexOf(b.priority)
        );

      catContacts.forEach((contact, index) => {
        const posX = catX + 50;
        const posY = catY + (index + 1) * cardHeight;

        newNodes.push({
          id: `contact-${contact.name}-${contact.phone}`,
          data: {
            label: (
              <div className="text-left">
                <div
                  style={{
                    background: priorityColors[contact.priority],
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: 4,
                    fontWeight: "bold",
                    marginBottom: 4,
                    textAlign: "center",
                  }}
                >
                  {contact.priority}
                </div>
                <div className={darkMode ? "text-white" : "text-black"}>
                  <strong>{contact.name}</strong>
                  <div>📞 {contact.phone}</div>
                  {contact.location && (
                    <div>📍 {contact.location}</div>
                  )}
                  {contact.website && (
                    <div>
                      🔗{" "}
                      <a
                        href={
                          contact.website.startsWith("http")
                            ? contact.website
                            : `https://${contact.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline text-xs"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                  <div className="flex gap-1 mt-2">
                    <button
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNewContact(contact);
                        setEditingContactIndex(
                          contacts.findIndex(
                            (c) =>
                              c.name === contact.name &&
                              c.phone === contact.phone
                          )
                        );
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm("Delete this contact?")) {
                          setContacts((prev) =>
                            prev.filter(
                              (c) =>
                                !(
                                  c.name === contact.name &&
                                  c.phone === contact.phone
                                )
                            )
                          );
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ),
          },
          position: { x: posX, y: posY },
          style: {
            background: darkMode ? "#111827" : "#FFFFFF",
            color: darkMode ? "#F9FAFB" : "#111827",
            border: `2px solid ${priorityColors[contact.priority]}`,
            borderRadius: 10,
            padding: 10,
            width: 220,
            cursor: "pointer",
          },
          draggable: true,
        });

        newEdges.push({
          id: `edge-${cat}-${contact.name}-${contact.phone}`,
          source: `cat-${cat}`,
          target: `contact-${contact.name}-${contact.phone}`,
          animated: true,
          style: { stroke: priorityColors[contact.priority] },
        });
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  };

  useEffect(() => {
    updateDiagram();
  }, [contacts, categories, darkMode, searchQuery]);

  const handleAddContact = (e) => {
    e.preventDefault();
    if (
      newContact.name &&
      newContact.phone &&
      newContact.category &&
      newContact.priority
    ) {
      if (editingContactIndex !== null) {
        const updated = [...contacts];
        updated[editingContactIndex] = newContact;
        setContacts(updated);
        setEditingContactIndex(null);
      } else {
        setContacts([...contacts, newContact]);
      }
      setNewContact({
        name: "",
        phone: "",
        location: "",
        website: "",
        category: "",
        priority: "Medium",
      });
    }
  };

  const exportContacts = () => {
    const data = JSON.stringify({ contacts, categories });
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importContacts = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = JSON.parse(ev.target.result);
      setContacts(data.contacts || []);
      setCategories(data.categories || []);
    };
    reader.readAsText(file);
  };

  const onNodeClick = (event, node) => {
    if (!node.id.startsWith("contact-")) return;
    const contact = contacts.find(
      (c) => `contact-${c.name}-${c.phone}` === node.id
    );
    if (contact) {
      setModalContact(contact);
    }
  };

  const onNodeDragStop = (event, node) => {
    if (!node.id.startsWith("contact-")) return;
    const { x, y } = node.position;
    categories.forEach((cat) => {
      const catNode = nodes.find((n) => n.id === `cat-${cat}`);
      if (!catNode) return;
      const dx = Math.abs(x - catNode.position.x);
      const dy = Math.abs(y - catNode.position.y);
      if (dx < 200 && dy < 300) {
        const contactIndex = contacts.findIndex(
          (c) => `contact-${c.name}-${c.phone}` === node.id
        );
        if (contacts[contactIndex].category !== cat) {
          const updated = [...contacts];
          updated[contactIndex].category = cat;
          setContacts(updated);
        }
      }
    });
  };

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="w-[300px] p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Contact Manager</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded w-full"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
        <form onSubmit={handleAddContact} className="mb-4">
          <input className="w-full p-2 mb-2 border rounded text-black"
            placeholder="Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          />
          <input className="w-full p-2 mb-2 border rounded text-black"
            placeholder="Phone"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          />
          <input className="w-full p-2 mb-2 border rounded text-black"
            placeholder="Location"
            value={newContact.location}
            onChange={(e) => setNewContact({ ...newContact, location: e.target.value })}
          />
          <input className="w-full p-2 mb-2 border rounded text-black"
            placeholder="Website"
            value={newContact.website}
            onChange={(e) => setNewContact({ ...newContact, website: e.target.value })}
          />
          <select className="w-full p-2 mb-2 border rounded text-black"
            value={newContact.category}
            onChange={(e) => setNewContact({ ...newContact, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
          <select className="w-full p-2 mb-2 border rounded text-black"
            value={newContact.priority}
            onChange={(e) => setNewContact({ ...newContact, priority: e.target.value })}
          >
            {priorityOrder.map((p, i) => (
              <option key={i} value={p}>{p}</option>
            ))}
          </select>
          <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded">
            {editingContactIndex !== null ? "Update Contact" : "Add Contact"}
          </button>
        </form>
        <input type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 border rounded text-black"
        />
        <div className="mb-4">
          <input className="w-full p-2 mb-2 border rounded text-black"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button className="w-full bg-purple-600 text-white px-4 py-2 rounded"
            onClick={() => {
              if (newCategory && !categories.includes(newCategory)) {
                setCategories([...categories, newCategory]);
                setNewCategory("");
              }
            }}
          >
            Add Category
          </button>
          <div className="mb-4">
  <h2 className="font-bold mb-2">Categories</h2>
  {categories.map((cat, i) => (
    <div
      key={i}
      className={`flex items-center justify-between mb-1 px-2 py-1 rounded ${
        darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <span>{cat}</span>
      <div className="flex gap-1">
        <button
          className="text-xs px-2 py-1 rounded bg-blue-500 text-white"
          onClick={() => {
            const newName = prompt("Edit category name:", cat);
            if (newName && !categories.includes(newName)) {
              const updated = [...categories];
              updated[i] = newName;
              setCategories(updated);
              // Also update any contacts with this category
              setContacts(contacts.map(c =>
                c.category === cat ? { ...c, category: newName } : c
              ));
            }
          }}
        >
          Edit
        </button>
        <button
          className="text-xs px-2 py-1 rounded bg-red-500 text-white"
          onClick={() => {
            if (window.confirm("Delete this category?")) {
              const updatedCats = categories.filter((_, idx) => idx !== i);
              setCategories(updatedCats);
              // Optionally: remove category from contacts too
              setContacts(contacts.map(c =>
                c.category === cat ? { ...c, category: "" } : c
              ));
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

        </div>
        <div className="flex flex-col gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowAnalytics(!showAnalytics)}>
            {showAnalytics ? "Show Diagram" : "Show Analytics"}
          </button>
          <button className="bg-yellow-600 text-white px-4 py-2 rounded" onClick={exportContacts}>
            Export JSON
          </button>
          <label className="bg-pink-600 text-white px-4 py-2 rounded text-center cursor-pointer">
            Import JSON
            <input type="file" accept=".json" onChange={importContacts} className="hidden" />
          </label>
        </div>
      </div>
      <div className="flex-1">
        {showAnalytics ? (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Analytics</h2>
    <div className="flex flex-wrap gap-8">
      <PieChart width={400} height={400}>
        <Pie data={priorityCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
          {priorityCounts.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={priorityColors[entry.name]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <BarChart width={400} height={300} data={categoryCounts} margin={{ top: 20 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  </div>
) : (
  <ReactFlow
    nodes={nodes}
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    onNodeClick={onNodeClick}
    onNodeDragStop={onNodeDragStop}
    fitView
  >
    <MiniMap />
    <Controls />
    <Background />
  </ReactFlow>
)}

      </div>
      {modalContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded shadow-lg max-w-md w-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            <h2 className="text-xl font-bold mb-2">Details for {modalContact.name}</h2>
            <p><strong>Phone:</strong> {modalContact.phone}</p>
            <p><strong>Location:</strong> {modalContact.location}</p>
            <p>
              <strong>Website:</strong>{" "}
              <a href={
                modalContact.website.startsWith("http")
                  ? modalContact.website
                  : `https://${modalContact.website}`
              }
              target="_blank" rel="noopener noreferrer"
              className="underline text-blue-400"
              >{modalContact.website}</a>
            </p>
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                modalContact.location
              )}&output=embed`}
              width="100%"
              height="300"
              frameBorder="0"
              allowFullScreen
              className="mt-4"
            ></iframe>
            <button
              onClick={() => setModalContact(null)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


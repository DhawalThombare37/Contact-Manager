
<h1 align="center">📇 ContactFlow – Smart Drag & Drop Contact Manager</h1>

<p align="center">
A modern, visually interactive Contact Manager with drag-and-drop cards, priority sorting, category flows, analytics, dark mode, import/export, and location-ready fields along with integrated website link feature. Built with <strong>React + Vite + TailwindCSS + ReactFlow + Recharts</strong>.
</p>

---

## 🚀 Live Demo

```
https://your-live-demo-link.com
```
Future inhancement can include feature to store this dataset in database and reload it back once session refreshes again.

---

## 🌟 Features

## 🧩 **Drag & Drop Contact Cards**
Organize contacts visually across categories using **ReactFlow**.

## 🎯 **Priority-Based Labels**
Color-coded priorities:
- 🔴 High  
- 🟡 Medium  
- 🟢 Low  

## 🗂️ **Dynamic Categories**
Add, delete, rename, and auto-update contact categories.

## 🔗 **Clickable Website Links**
Automatically opens in a new tab.  
(Handles `google.com` → `https://google.com`)

## 📍 **Location Field**
Supports integration with maps (Leaflet already included).
<img width="1869" height="826" alt="Screenshot 2025-12-09 144735" src="https://github.com/user-attachments/assets/c25bf117-8d0d-493a-b208-cd1c80d7313c" />


## 📊 **Analytics Dashboard**
- Pie chart for priority distribution  
- Bar chart for category counts
<img width="1875" height="852" alt="image" src="https://github.com/user-attachments/assets/2be870a3-3698-4cd3-9935-ba51efa95412" />


## 🌓 **Dark / Light Mode**
Simple toggle for theme switch.

## 💾 **JSON Import / Export**
Backup or restore the entire contact database.

---

## 📂 Project Structure
```
contact-manager/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   └── ContactManager.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── styles.css
│
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🛠️ Tech Stack

| Purpose | Library |
|---------|---------|
| UI Framework | React |
| Bundler | Vite |
| Styling | TailwindCSS |
| Flow Diagram Engine | ReactFlow |
| Charts | Recharts |
| Map Support| Leaflet + React-Leaflet |

---

## ⚙️ Installation

### 1️⃣ Clone the repository
```sh
git clone https://github.com/your-username/contact-manager.git
cd contact-manager
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Start development server
```sh
npm run dev
```

### 4️⃣ Open your browser
Vite will print something like:
```
http://localhost:5173
```

---

## 🏗️ Build for Production
```sh
npm run build
npm run preview
```

---

## 🖼️ Screenshots
<img width="1858" height="655" alt="Screenshot 2025-12-09 144632" src="https://github.com/user-attachments/assets/755f9476-bdb0-4ab0-a840-d773c4ae0cd0" />
<img width="1869" height="826" alt="Screenshot 2025-12-09 144735" src="https://github.com/user-attachments/assets/ae09dfca-77a0-4098-968b-e5810a09fbbd" />
<img width="1875" height="852" alt="Screenshot 2025-12-09 145223" src="https://github.com/user-attachments/assets/7452b07d-b26b-4764-a0ad-af5ca3616cc1" />

---

## 🗺️ Map Integration 

Leaflet is already installed. To display maps inside our modal:
```jsx
import { MapContainer, TileLayer, Marker } from "react-leaflet";
```

---

## 📦 Import / Export Format
```json
{
  "contacts": [],
  "categories": []
}
```

Import accepts `.json` files with the above structure.

---

## 🧪 Future Enhancements

* 📍 Google Maps autocomplete
* 🔔 Notifications / reminders
* 👥 Contact groups & sharing
* 🌐 Multi-language support
* 📱 Mobile responsive UI

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue to discuss changes first.

---

## 📜 License

MIT License

---

## 🙌 Credits

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [TailwindCSS](https://tailwindcss.com/)
* [ReactFlow](https://reactflow.dev/)
* [Recharts](https://recharts.org/)
* [Leaflet](https://leafletjs.com/)

---

<p align="center">
  ⭐ If you like this project, feel free to star the repo! ⭐
</p>
